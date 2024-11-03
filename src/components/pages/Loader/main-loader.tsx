'use client';

import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

export default function MainLoader() {
  const animationContainer = useRef(null);

  useEffect(() => {
    let animationInstance: AnimationItem | undefined;
    if (animationContainer.current) {
      animationInstance = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/animation/loader.json'
      });
    }

    return () => {
      if (animationInstance) {
        animationInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="h-screen flex justify-center items-center w-full">
      <div className='w-2/4' ref={animationContainer}></div>
    </div>
  );
}