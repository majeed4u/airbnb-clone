import { hash } from 'bcrypt';
import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const hashedPassword = await hash(password, 12);
  const foundUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (foundUser) {
    throw new Error(' email already exists');
  }
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });
  return NextResponse.json(user);
}
