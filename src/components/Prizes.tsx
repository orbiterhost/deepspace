import { Button } from '@/components/ui/button';
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PartyPopperIcon, TrophyIcon } from 'lucide-react';

function Prizes() {

  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-start gap-4 bg-black text-white">
      <div className='flex sm:flex-row flex-col sm:gap-8 gap-4 text-center mt-12'>
        <h1 className='font-sf-mono sm:text-8xl text-6xl tracking-[1rem]'>PRIZES</h1>
      </div>
      <div className='flex flex-col space-y-6 mt-12'>
       <Card>
         <CardHeader>
           <CardTitle className='flex items-center gap-4'>
            <TrophyIcon />
             Grand Prize
           </CardTitle>
           <CardDescription>Best mini app hosted on Orbiter</CardDescription>
         </CardHeader>
         <CardContent>
          Lifetime plan for hosting on Orbiter
         </CardContent>
       </Card>
       <Card>
         <CardHeader>
           <CardTitle className='flex items-center gap-4'>
            <PartyPopperIcon />
            Ping'em Prize
           </CardTitle>
           <CardDescription>Best mini app using Ping'em</CardDescription>
         </CardHeader>
         <CardContent>
           500M $lemon3
         </CardContent>
       </Card>
      </div>
      <div className='flex flex-col gap-8'>
        <Button asChild variant='secondary'>
          <RouterLink to="/">Back</RouterLink>
        </Button>
      </div>
    </main>
  )
}

export default Prizes
