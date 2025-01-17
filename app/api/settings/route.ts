import getCurrentUser from '@/actions/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';


export async function POST(request: NextRequest) {

  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updateUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        image: image,
        name: name
      }
    });

    return NextResponse.json(updateUser);

  } catch (error: any) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}