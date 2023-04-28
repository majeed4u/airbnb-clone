import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitlabProvider from 'next-auth/providers/gitlab';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import client from '@/app/lib/prismadb';
import bcrypt from 'bcrypt';

export default NextAuth({
  adapter: PrismaAdapter(client),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitlabProvider({
      clientId: process.env.GITLAB_ID as string,
      clientSecret: process.env.GITLAB_SECRET as string,
    }),
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { type: 'text', label: 'email' },
        password: { type: 'password', label: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        const user = await client.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials');
        }
        const comparePassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!comparePassword) {
          throw new Error('incorrect email or password ');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',

  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
