import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const VideoCall = () => {
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);

  const { partnerId } = useParams(); // Used to generate consistent room name
  const currentUser = localStorage.getItem('userId') || 'user_local';

  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    // Generate consistent room ID (for dummy or real user)
    if (currentUser && partnerId) {
      const generatedRoom = [currentUser, partnerId].sort().join('-');
      setRoomId(generatedRoom);
    }
  }, [currentUser, partnerId]);

  useEffect(() => {
    if (!roomId) return;

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
          roomName: roomId,
          parentNode: jitsiContainerRef.current,
          configOverwrite: {},
          interfaceConfigOverwrite: {
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'chat', 'raisehand', 'tileview', 'hangup'
            ],
          },
          userInfo: {
            displayName: currentUser,
          },
        };

        apiRef.current = new window.JitsiMeetExternalAPI(domain, options);
      })
      .catch((error) => {
        console.error('Failed to load Jitsi API', error);
      });

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
  }, [roomId]);

  return (
    <div className="flex justify-center items-center">
      <div
        ref={jitsiContainerRef}
        className="w-[90vw] h-[85vh] rounded-xl shadow-2xl"
      />
    </div>
  );
};

export default VideoCall;
