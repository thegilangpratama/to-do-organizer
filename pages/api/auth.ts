// pages/api/auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Sign up
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      res.status(200).json({ user });

    } else if (req.method === 'POST') {
      const { email, password } = req.body;

      try {
        // Sign in
        const { user, error } = await supabase.auth.signIn({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        res.status(200).json({ user });

      } catch (error) {
        console.error('Error signing in:', error.message);
        res.status(500).json({ error: 'Error signing in' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
