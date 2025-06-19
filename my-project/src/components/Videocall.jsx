import React, { useEffect, useRef } from 'react';

const  VideoCall = () => {
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null); // Prevent multiple inits
useEffect(() => {
  let scriptAdded = false;

  const loadJitsiScript = () => {
    return new Promise((resolve, reject) => {
      if (window.JitsiMeetExternalAPI) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => {
        scriptAdded = true;
        resolve();
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  loadJitsiScript()
    .then(() => {
      if (!jitsiContainerRef.current || apiRef.current) return;

      const domain = 'meet.jit.si';
      const options = {
        roomName: `SkillShareRoom-${Date.now()}`,
        parentNode: jitsiContainerRef.current,
        configOverwrite: {},
        interfaceConfigOverwrite: { DISABLE_HID: true, },
      };

      apiRef.current = new window.JitsiMeetExternalAPI(domain, options);
    })
    .catch((error) => {
      console.error('Failed to load Jitsi API', error);
    });

  // Clean up to prevent multiple mounts
  return () => {
    if (apiRef.current) {
      apiRef.current.dispose();
      apiRef.current = null;
    }
    if (scriptAdded) {
      const existingScript = document.querySelector('script[src="https://meet.jit.si/external_api.js"]');
      if (existingScript) existingScript.remove();
    }
  };
}, []);



  return (
    <div className=" flex justify-center items-center">
      <div
        ref={jitsiContainerRef}
        className="w-[80vw] h-[80vh] rounded-xl"
      />
    </div>
  );
};

export default VideoCall;
