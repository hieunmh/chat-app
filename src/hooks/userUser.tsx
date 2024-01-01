'use client';

import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react';

import { UserType } from '@/types/type';
import { useRouter } from 'next/navigation';

import { Database } from '@/types/supabaseType';

type UserContextType = {
  userData: UserType | null;
  logOut: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

const Provider = ({ children } : { children: React.ReactNode }) => {

  const supabase = createClientComponentClient<Database>();

  const router = useRouter();
  const [userData, setUserData] = useState<UserType | null>(null);

  const getCurrentSession = async () => {
    const res = await supabase.auth.getSession();
    if (res && res.data.session) {
      return res.data.session;
    }
    setUserData(null);
    return null;
  }

  const getCurrentUser = async () => {
    const res = await supabase.auth.getUser();

    if (res && res.data.user) {
      const data = await supabase.from('users').select('*').eq('id', res.data.user.id).single();
      setUserData(data.data);
    }
  }

  useEffect(() => {
    const isUser = async () => {
      const currentSession = await getCurrentSession();
      if (currentSession) await getCurrentUser();
    }
    isUser();
  }, []);

  const logOut = async () => {
    await supabase.auth.signOut();
    setUserData(null);
    router.push('/login');
  }

  const value = { userData, logOut }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}

export const useUser = () => useContext(UserContext);

export default Provider;