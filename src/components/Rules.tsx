import { Button } from '@/components/ui/button';
import { Link as RouterLink } from "react-router-dom";

function Rules() {

  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-start gap-4 bg-black text-white">
      <div className='flex sm:flex-row flex-col sm:gap-8 gap-4 text-center mt-12'>
        <h1 className='font-sf-mono sm:text-8xl text-6xl tracking-[1rem]'>RULES</h1>
      </div>
      <ul className='pl-4 list-disc m-12 space-y-4'>
        <li>Project must be started after 04/28/25, cannot be a previous app</li>
        <li>Project must have a GitHub repo with a history of building the project out</li>
        <li>Project must be hosted on Orbiter</li>
        <li>Project must have Farcaster account association</li>
        <li>Projects will be submitted through the Deep Space Mini App</li>
      </ul>
      <div className='flex flex-col gap-8'>
        <Button asChild variant='secondary'>
          <RouterLink to="/">Back</RouterLink>
        </Button>
      </div>
    </main>
  )
}

export default Rules
