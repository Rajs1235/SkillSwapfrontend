import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import api from './api';
function ContactUs() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

const onSubmit = async (data) => {
  try {
    const res = await api.post('/users/feedback', data);
    console.log(res.data);
    setIsSubmitted(true);
  } catch (error) {
    console.error('Feedback submission failed:', error);
    alert('Something went wrong. Please try again.');
  }
};

  return (
    <div className="w-full mx-auto mt-80 bg-white/30 backdrop-blur-md p-14 rounded-xl shadow-2xl text-white space-y-10" 
         style={{ maxWidth: '90rem' }}>  {/* Increased width */}
      <h2 className="text-5xl font-bold text-center drop-shadow-xl mb-8">Contact Us</h2>

      {isSubmitted ? (
        <div className="text-center py-10">
          <h3 className="text-3xl font-semibold mb-4">Thank You!</h3>
          <p className="text-xl mb-6">Your message has been sent successfully.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-violet-600 text-white px-10 py-3 rounded-lg hover:bg-violet-700 transition-all shadow-lg"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">First Name</label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 bg-sky-100 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400"
              />
              {errors.firstName && <p className="text-red-400 mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Last Name</label>
              <input
                {...register('lastName', { required: 'Last name is required' })}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 bg-sky-100 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400"
              />
              {errors.lastName && <p className="text-red-400 mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Email Address</label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-sky-100 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400"
            />
            {errors.email && <p className="text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-2 font-semibold">Subject</label>
            <select
              {...register('subject', { required: 'Subject is required' })}
              className="w-full px-4 py-2 bg-sky-100 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400"
            >
              <option value="">Select a subject</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
            </select>
            {errors.subject && <p className="text-red-400 mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block mb-2 font-semibold">Message</label>
            <textarea
              {...register('message', { 
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters'
                }
              })}
              rows="6" 
              placeholder="Enter your message"
              className="w-full px-4 py-2 bg-sky-100 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400"
            ></textarea>
            {errors.message && <p className="text-red-400 mt-1">{errors.message.message}</p>}
          </div>

          <div className="text-center">
            <button 
              type="submit" 
              className="bg-violet-600 text-white px-16 py-4 rounded-lg hover:bg-violet-700 transition-all shadow-lg text-xl"
            >
              SEND MESSAGE
            </button>
          </div>

          {/* Contact Information - now in a single row */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <h3 className="text-2xl font-semibold mb-8 text-center">Our Office</h3>
            <div className="flex flex-wrap justify-center gap-12">  {/* Increased gap */}
              <div className="flex items-center">
                <FaEnvelope className="text-3xl mr-4 text-violet-400" />
                <div>
                  <h4 className="font-medium text-lg mb-1">Email</h4>
                  <p className="text-sky-100">support@skillshare.in</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-3xl mr-4 text-violet-400" />
                <div>
                  <h4 className="font-medium text-lg mb-1">Phone</h4>
                  <p className="text-sky-100">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-3xl mr-4 text-violet-400" />
                <div>
                  <h4 className="font-medium text-lg mb-1">Address</h4>
                  <p className="text-sky-100">
                    SkillShare India HQ, 45/2 Tech Park Road<br />
                    Bengaluru, Karnataka - 560066
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ContactUs;
