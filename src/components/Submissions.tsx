import { Button } from '@/components/ui/button';
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { ExternalLinkIcon, GithubIcon, MessageSquareIcon } from 'lucide-react';

type Submission = {
  id: number;
  fid: number | null;
  cast_url: string;
  github_url: string;
  mini_app_url: string;
  created_at: string;
}

function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/submissions`);
        const result = await response.json();

        if (result.ok) {
          setSubmissions(result.data);
        } else {
          toast.error("Failed to fetch submissions");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error connecting to server");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-start gap-4 bg-black text-white">
      <div className='flex sm:flex-row flex-col sm:gap-8 gap-4 text-center mt-12 mb-8'>
        <h1 className='font-sf-mono sm:text-8xl text-6xl tracking-[1rem]'>SUBMISSIONS</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <p className="text-xl">Loading submissions...</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="flex items-center justify-center p-12">
          <p className="text-xl">No submissions yet</p>
        </div>
      ) : (
        <div className="w-full max-w-3xl px-4 space-y-6 mb-12">
          {submissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <CardTitle>
                  Project Submission {submission.fid && `(FID: ${submission.fid})`}
                </CardTitle>
                <CardDescription>
                  Submitted on {formatDate(submission.created_at)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MessageSquareIcon className="w-5 h-5" />
                  <a
                    href={submission.cast_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1"
                  >
                    View Cast <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-5 h-5" />
                  <a
                    href={submission.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1"
                  >
                    GitHub Repo <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <ExternalLinkIcon className="w-5 h-5" />
                  <a
                    href={submission.mini_app_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1"
                  >
                    Mini App <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mb-8">
        <Button asChild variant='secondary'>
          <RouterLink to="/">Back to Home</RouterLink>
        </Button>
      </div>
    </main>
  );
}

export default Submissions;
