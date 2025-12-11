import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

declare global {
  // eslint-disable-next-line no-var
  var prisma: any;
}

let prisma: any;

// Initialize PrismaClient with proper handling for Vercel environment
if (process.env.NODE_ENV === 'production') {
  // In production, use a singleton pattern with globalThis
  if (!global.prisma) {
    const { PrismaClient } = require('@prisma/client');
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  // In development, create a new instance each time to avoid hot reloading issues
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
}
import bcrypt from 'bcrypt';


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // In a real app, you would hash the password and compare it
        // For now, we'll just check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          return null;
        }

        // Check password (in real app, compare hashed passwords)
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'default-secret-key',
  jwt: {
    maxAge: 60 * 24 * 30, // 30 days
  },
};

export const handler = NextAuth(authOptions);
export default handler;