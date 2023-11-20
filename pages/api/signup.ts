// pages/api/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Check if the user already exists in the Prisma database
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create a new user in the Prisma database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Sign up the user using Supabase
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(500).json({ error: 'Error signing up user' });
    }

    return res.status(200).json({ user: newUser });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
