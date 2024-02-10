import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';

export default async function UserLayout({ children } : { children: React.ReactNode }) {
  return (
    // @ts-ignore  Server Component
    <Sidebar>
      <div className='h-full'>
        {children}
      </div>
    </Sidebar>
  )
}
