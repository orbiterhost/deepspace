import { useState, useEffect } from 'react'
import sdk from '@farcaster/frame-sdk';
import { Context } from '@farcaster/frame-sdk';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from "react-router-dom";
import { toast } from "sonner"

function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  async function addFrame() {
    try {
      await sdk.actions.addFrame()
      toast("Subscribed for future notifcations!")
    } catch (error: any) {
      console.log(error)
      toast(error.message.toString())
    }
  }


  if (!isSDKLoaded) {
    return <div className="bg-black text-white">Loading...</div>;
  }

  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-center gap-4 bg-black text-white">
      <div className='flex sm:flex-row flex-col sm:gap-8 gap-4 text-center'>
        <h1 className='font-sf-mono sm:text-8xl text-6xl tracking-[1rem]'>DEEP</h1>
        <h1 className='font-sf-mono sm:text-8xl text-6xl tracking-[1rem]'>SPACE</h1>
      </div>
      <h4 className='font-sf-mono sm:text-3xl text-md mb-2'>Mini App Hackathon by Orbiter</h4>
      <h4 className='font-sf-mono sm:text-3xl text-md mb-12'>April 28th - May 2nd</h4>
      {context ? (
        <div className='flex flex-col gap-8'>
          <Button
            onClick={addFrame}
            variant='secondary'>
            Subscribe
          </Button>
          <Button
            variant='secondary'
            onClick={() => sdk.actions.openUrl("https://docs.orbiter.host/miniapps")}>
            Docs
          </Button>
          <Button asChild variant='secondary'>
            <RouterLink to="/rules">Rules</RouterLink>
          </Button>

        </div>
      ) : (
        <div className='flex flex-col gap-8'>
          <Button asChild variant='secondary'>
            <a
              target='_blank'
              rel="noopener noreferrer"
              href="https://warpcast.com/~/frames/launch?domain=deepspace.orbiter.host"
            >
              Open in Farcaster
            </a>
          </Button>
          <Button asChild variant='secondary'>
            <a
              href="https://docs.orbiter.host/miniapps"
              target='_blank'
              rel="noopener noreferrer"
            >
              Docs
            </a>
          </Button>
          <Button asChild variant='secondary'>
            <RouterLink to="/rules">Rules</RouterLink>
          </Button>

        </div>
      )}
    </main>
  )
}

export default Home
