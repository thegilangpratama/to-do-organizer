import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Check if the user exists in the Prisma database
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!existingUser) {
        return res.status(400).json({ error: 'User not found' });
      }

      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      return res.status(200).json({ user: existingUser });

    } catch (error) {
      console.error('Error connecting to the database:', error);

      // Handle specific database connection errors or send a generic error response
      if (error.code === 'P2002') {
        // Unique constraint violation, handle accordingly
        return res.status(400).json({ error: 'Duplicate key violation' });
      }

      return res.status(500).json({ error: 'Internal server error' });
    } finally {
      // Close the Prisma client to release the connection
      await prisma.$disconnect();
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
