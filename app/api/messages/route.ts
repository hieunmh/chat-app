import getCurrentUser from '@/actions/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {


  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

  } catch (error: any) {
    console.log(error, 'ERROR MESSAGES');
    return new NextResponse('InternalError', { status: 500 });
  }
}