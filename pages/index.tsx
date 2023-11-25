// pages/signin.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import '../app/globals.css';
import Link from 'next/link';

const SignIn: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check the user's login status when the component mounts
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    // If user is logged in, redirect to /home
    if (isLoggedIn === 'true') {
      router.push('/home');
    }
  }, [router]);

  const handleSignIn = async () => {
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirect to the app's main page upon successful sign-in
        sessionStorage.setItem('isLoggedIn', 'true');
        setErrorMessage('');
        router.push('/home'); // Change the redirection path as needed
      } else {
        const data = await response.json();
        console.error('Sign-in error:', data.error);
        // Handle and display the error to the user
        setErrorMessage(data.error || 'An error occurred during sign-in.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-96 p-8 bg-gray-100 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
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
        {errorMessage && <p className="text-red-500 text-xs mb-2">{errorMessage}</p>}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <p className="text-sm mb-2 mt-5 text-center">
          <a className="text-blue-500" href="/signup">Sign up</a> here if you don't have an account
        </p>
      </div>
    </div>
  );
};

export default SignIn;
