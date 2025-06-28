import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import sha256 from 'crypto-js/sha256'; // npm install crypto-js
import Hex from 'crypto-js/enc-hex';

const VideoCall = () => {
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);

  const { partnerId } = useParams();
  const currentUser = localStorage.getItem('userId');

  const [roomId, setRoomId] = useState('');

  const generateRoomId = (u1, u2) => {
    const sorted = [u1, u2].sort().join('-');
    return sha256(sorted).toString(Hex).slice(0, 16); // mimic backend
  };

  useEffect(() => {
    if (currentUser && partnerId) {
      const generated = generateRoomId(currentUser, partnerId);
      setRoomId(generated);
    }
  }, [currentUser, partnerId]);

  useEffect(() => {
    if (!roomId) return;

    let scriptAdded = false;

    const loadJitsiScript = () => {
      return new Promise((resolve, reject) => {
        if (window.JitsiMeetExternalAPI) return resolve();

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
          userInfo: {
            displayName: currentUser,
          },
        };

        apiRef.current = new window.JitsiMeetExternalAPI(domain, options);
      })
      .catch(console.error);

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
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
