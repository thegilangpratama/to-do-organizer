// pages/signup.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google'
import '../app/globals.css'

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      // Redirect to "/home" if the user is already logged in
      router.push('/home');
    }
  }, []); // Empty dependency array ensures the effect runs only once on component mount



  const handleSignUp = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirect to the app's main page upon successful sign-up
        router.push('/home');
      } else {
        const data = await response.json();
        console.error('Sign-up error:', data.error);
        // Handle and display the error to the user
        setErrorMessage('Email already exist');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-96 p-8 bg-gray-100 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-6 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        { errorMessage && <p className="text-red-500 text-xs mb-2">{errorMessage}</p> }
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <p className="text-sm mb-2 mt-5 text-center">
          <a className="text-blue-500" href="/">Sign in</a> here if you have an account
        </p>
      </div>
    </div>
  );
}
