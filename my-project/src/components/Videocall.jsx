
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; // axios instance

const  VideoCall = () => {
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);
  const [roomId, setRoomId] = useState('');
  const { userId: currentUser } = JSON.parse(localStorage.getItem('userData')) || {};
  const { partnerId } = useParams(); // The other matched user's ID

  useEffect(() => {
    const fetchRoomId = async () => {
      try {
        const res = await api.get(`/v1/match/room/${currentUser}/${partnerId}`);
        setRoomId(res.data.roomId);
      } catch (err) {
        console.error('Error fetching room ID:', err);
      }
    };

    if (currentUser && partnerId) fetchRoomId();
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
          interfaceConfigOverwrite: { DISABLE_JOIN_LEAVE_NOTIFICATIONS: true },
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
    <div className=" flex justify-center items-center">
      <div
        ref={jitsiContainerRef}
        className="w-[80vw] h-[80vh] rounded-xl"
      />

    </div>
  );
};

export default VideoCall;
