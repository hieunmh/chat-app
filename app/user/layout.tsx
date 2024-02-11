import getUsers from '@/actions/getUser';
import Sidebar from '@/components/sidebar/Sidebar';
import UserList from '@/components/user/UserList';
import React from 'react';

export default async function UserLayout({ children } : { children: React.ReactNode }) {

  const users = await getUsers();

  return (
    // @ts-ignore  Server Component
    <Sidebar>
      <div className='h-full'>
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  )
}
