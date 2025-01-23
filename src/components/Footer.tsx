'use client';
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubscription = (e: React.FormEvent) => {
    e.preventDefault();

    // Example subscription logic
    if (email) {
      setMessage('Subscription successful! Thank you for subscribing.');
      setEmail('');
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight leading-tight">
          Get the Latest Updates Right in Your Inbox!
        </h3>
        <p className="mb-8 text-lg text-gray-300 opacity-90">
          Subscribe to our newsletter and stay up to date with all the latest news and offers!
        </p>

        <form onSubmit={handleSubscription} className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 max-w-3xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-4 rounded-full text-black w-full md:w-2/3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:ring-4 focus:ring-blue-300 w-full md:w-auto"
          >
            Subscribe Now
          </button>
        </form>

        {message && <p className="mt-4 text-lg text-gray-300">{message}</p>}
      </div>

      <div className="mt-12 text-center text-sm text-gray-400 opacity-75">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
