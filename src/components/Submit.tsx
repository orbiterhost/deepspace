import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link as RouterLink } from "react-router-dom";
import { useState } from 'react';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Context } from '@farcaster/frame-sdk';

// Define form schema with Zod
const formSchema = z.object({
  castUrl: z.string().url({ message: "Please enter a valid Farcaster Cast URL" }),
  githubUrl: z.string().url({ message: "Please enter a valid GitHub repository URL" }),
  miniAppUrl: z.string().url({ message: "Please enter a valid Mini App URL" }),
  username: z.string()
});

type FormValues = z.infer<typeof formSchema>;

function Submit({ context }: { context: Context.FrameContext | undefined }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      castUrl: '',
      githubUrl: '',
      miniAppUrl: '',
      username: ''
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {

      const data = JSON.stringify({
        fid: context?.user.fid,
        castUrl: values.castUrl,
        githubUrl: values.githubUrl,
        miniAppUrl: values.miniAppUrl,
        username: context?.user.username
      })
      const req = await fetch(`${import.meta.env.VITE_SERVER_URL}/submit`, {
        method: 'POST',
        body: data
      });

      const res = await req.json()

      if(!res.ok){
       throw Error(res.data)
      }

      toast.success("Project submitted successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to submit project. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-start gap-4 bg-black text-white">
      <div className='flex sm:flex-row flex-col sm:gap-8 gap-4 text-center mt-12 mb-8'>
        <h1 className='font-sf-mono sm:text-8xl text-6xl tracking-[1rem]'>SUBMIT</h1>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Submit Your Project</CardTitle>
          <CardDescription>
            <p>All projects must meet the following requirements:</p>
            <ul className='pl-6 list-disc pt-4'>
             <li>Deployed on Orbiter</li>
             <li>Have a cast talking about the Mini App</li>
             <li>A public GitHub repo</li>
            </ul>

          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="castUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farcaster Cast URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://warpcast.com/..."
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Repository URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/..."
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="miniAppUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mini App URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://yourapp.orbiter.website"
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Project"}
                </Button>

                <Button asChild variant="secondary">
                  <RouterLink to="/">Back to Home</RouterLink>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

export default Submit
