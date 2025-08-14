// src/components/VideoCall.jsx
// A self-contained component for a 1-on-1 Twilio video call.

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TwilioVideo from 'twilio-video';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';

// This function should make a request to YOUR backend server
// to get a Twilio Access Token.
async function fetchToken(identity, roomName) {
  // In a real app, you'll want to replace this with a fetch call
  // to your own server.
  // Example:
  // const response = await fetch('https://your-server.com/generate-token', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ identity, roomName })
  // });
  // const data = await response.json();
  // return data.token;

  // For demonstration, we're using a placeholder.
  // IMPORTANT: Replace this with your actual token-generating logic.
  // You can quickly generate a testing token in the Twilio Console:
  // https://www.twilio.com/console/video/testing-tools
  const placeholderToken = "PASTE_A_VALID_TWILIO_ACCESS_TOKEN_HERE_FOR_TESTING";
  if (placeholderToken === "PASTE_A_VALID_TWILIO_ACCESS_TOKEN_HERE_FOR_TESTING") {
      alert("Please replace the placeholder token in VideoCall.jsx with a valid Twilio Access Token for testing.");
  }
  return placeholderToken;
}


function VideoCall() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [participants, setParticipants] = useState([]);

  // Refs for video containers
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    const connectToRoom = async () => {
      // For simplicity, using the roomId as the user's identity.
      // In a real app, you'd use a unique user ID.
      const token = await fetchToken(roomId, roomId);

      TwilioVideo.connect(token, {
        name: roomId,
        audio: true,
        video: { width: 640 }
      }).then(room => {
        setRoom(room);
        
        // Attach local participant's video
        TwilioVideo.createLocalVideoTrack().then(track => {
            localVideoRef.current.appendChild(track.attach());
        });

        // Handle already connected participants
        room.participants.forEach(participantConnected);

        // Handle new participants connecting
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
      }).catch(err => {
        console.error("Could not connect to Twilio room:", err);
      });
    };

    connectToRoom();

    // Cleanup function to disconnect from the room
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [roomId]);

  const participantConnected = (participant) => {
    console.log(`Participant "${participant.identity}" connected`);
    setParticipants(prevParticipants => [...prevParticipants, participant]);

    participant.on('trackSubscribed', track => {
        if (track.kind === 'video' || track.kind === 'audio') {
            remoteVideoRef.current.appendChild(track.attach());
        }
    });

    participant.on('trackUnsubscribed', track => {
        track.detach().forEach(element => element.remove());
    });
  };

  const participantDisconnected = (participant) => {
    console.log(`Participant "${participant.identity}" disconnected`);
    // Clean up remote video container
    if (remoteVideoRef.current) {
        remoteVideoRef.current.innerHTML = '';
    }
    setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));
  };
  
  const handleToggleMute = () => {
    room.localParticipant.audioTracks.forEach(publication => {
        if (isMuted) {
            publication.track.enable();
        } else {
            publication.track.disable();
        }
    });
    setIsMuted(!isMuted);
  };

  const handleToggleCamera = () => {
      room.localParticipant.videoTracks.forEach(publication => {
          if(isCameraOff) {
              publication.track.enable();
          } else {
              publication.track.disable();
          }
      });
      setIsCameraOff(!isCameraOff);
  };

  const handleHangUp = () => {
    if (room) {
      room.disconnect();
    }
    navigate('/dashboard'); // Or wherever you want to redirect after the call
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h2 className="text-white text-2xl mb-4">Video Call: {roomId}</h2>
      
      {/* Video containers */}
      <div className="relative w-full max-w-4xl h-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Remote Participant Video */}
        <div ref={remoteVideoRef} className="bg-black rounded-lg w-full h-full overflow-hidden">
            {participants.length === 0 && (
                <div className="w-full h-full flex items-center justify-center text-white">
                    <p>Waiting for the other participant to join...</p>
                </div>
            )}
        </div>

        {/* Local Participant Video */}
        <div ref={localVideoRef} className="bg-black rounded-lg w-full h-full overflow-hidden md:absolute md:w-48 md:h-36 md:bottom-4 md:right-4"></div>
      </div>

      {/* Call Controls */}
      <div className="absolute bottom-10 flex space-x-6 bg-gray-800 bg-opacity-70 p-4 rounded-full">
        <button onClick={handleToggleMute} className="p-3 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition">
          {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
        </button>
        <button onClick={handleToggleCamera} className="p-3 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition">
          {isCameraOff ? <FaVideoSlash size={24} /> : <FaVideo size={24} />}
        </button>
        <button onClick={handleHangUp} className="p-3 bg-red-600 rounded-full text-white hover:bg-red-700 transition">
          <FaPhoneSlash size={24} />
        </button>
      </div>
    </div>
  );
}

export default VideoCall;
