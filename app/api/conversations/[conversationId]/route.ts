import getCurrentUser from '@/actions/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { pusherServer } from '@/libs/pusher';


interface Iparams {
  conversationId?: string;
}

export async function DELETE(request: NextRequest, { params } : { params: Iparams }) {

  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        users: true
      }
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        }
      }
    });


    existingConversation.users.forEach(user => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
      }
    })

    return NextResponse.json(deletedConversation);

  } catch (error: any) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}