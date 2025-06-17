import React from 'react';
import { Link } from 'react-router-dom';
import meImage from '../assets/me.jpg';
import qrCode from '../assets/qr.jpg'; // QR code image

function AboutUs() {
  return (
    <div className="">
      <div className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          
          {/* Left side - Content */}
          <div className="p-12 flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-6 text-white">
              About Us
            </h1>
            <p className="text-xl mb-8 text-white/80">
              Building a platform where knowledge sharing becomes effortless and rewarding. 
              Our mission is to connect people who want to learn with those who want to teach.
            </p>

            {/* Developer Profile Section */}
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 mb-6">
              <div className="flex items-center gap-6">
                <img 
                  src={meImage} 
                  alt="Developer" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-teal-400"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-teal-400">Raj Srivastava</h3>
                  <p className="text-white/70 mb-2">BTech </p>
                  <p className="text-white/80 text-sm">
                    Engineering Undergrad trying to build a fruitful skilll sharing Platform for the society
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link 
                to="/signup" 
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Join Now
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-white hover:bg-white/20 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Right side - Flip card with image and QR */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-800/30 to-purple-800/30 p-8">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-64 h-64 rounded-full bg-teal-400 mix-blend-screen filter blur-3xl"></div>
                <div className="w-64 h-64 rounded-full bg-purple-400 mix-blend-screen filter blur-3xl ml-20"></div>
              </div>

              {/* Flip Card */}
              <div className="relative z-10 flip-card w-48 h-48">
                <div className="flip-card-inner">
                  
                  {/* Front: Profile image */}
                  <div className="flip-card-front flex flex-col items-center">
                    <img 
                      src={meImage} 
                      alt="Developer" 
                      className="w-48 h-48 rounded-full object-cover border-4 border-white/50 shadow-xl mb-4"
                    />
                    <h3 className="text-2xl font-semibold text-white/80">Raj Srivastava</h3>
                    <p className="text-white/60 mt-2">MANIT Bhopal</p>
                    <p className="text-white/60 mt-2">Creating meaningful connections</p>
                  </div>

                  {/* Back: QR code with coffee message */}
{/* Back: QR code with coffee message */}
<div className="flip-card-back flex flex-col items-center justify-center text-center">
  <img 
    src={qrCode} 
    alt="Buy Me a Coffee" 
    className="w-48 h-48 rounded-full object-cover border-4 border-yellow-400 shadow-xl mb-4"
  />
  <p className="text-teal-400 text-2xl font-semibold">Scan & Buy me a coffee!! 😉</p>
 <p className="text-8xl mt-2 fall-animation fall-emoji hidden">🧋</p>

</div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Flip animation styles */}
     
    </div>
    </div>
  );
}

export default AboutUs;
