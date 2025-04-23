import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Rules from './components/Rules';
import sdk from '@farcaster/frame-sdk';
import { Context } from '@farcaster/frame-sdk';


function App() {
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
      console.log(context)
    }
  }, [isSDKLoaded, context]);

  if (!isSDKLoaded) {
    return <div className="bg-black text-white min-h-screen w-full flex flex-col items-center justify-center">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className='min-h-screen w-full flex flex-col items-center justify-start bg-background'>
        <Routes>
          <Route path="/" element={<Home context={context} sdk={sdk} />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
