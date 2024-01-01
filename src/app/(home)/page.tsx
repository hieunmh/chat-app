'use client';

import MainLayout from '@/components/MainLayout'
import React, { useEffect } from 'react';
import { useNavigator } from '@/hooks/useClient';
import OrderTracking from '@/components/home/OrderTracking';
import Estimate from '@/components/home/Estimate';

export default function Home() {

  let { navigatorTab, setNavigatorTab } = useNavigator();

  useEffect(() => {

  })

  return (
    <MainLayout>
      <div className='w-full h-full flex flex-col items-center justify-center relative'>
        <div className='w-[1100px] mt-6 flex items-center justify-center'>
          <div id='navigatortab' className='w-[800px] flex flex-col items-center justify-center'>
            <div className='w-full flex text-sm md:text-2xl'>
              <button className={`w-[50%] flex items-center justify-center font-semibold ${navigatorTab == 'follow' ? 'text-[#ee4d2d]' : 'text-gray-500'}`}
                onClick={() => setNavigatorTab('follow')}
              >
                Theo dỗi đơn hàng
              </button>

              <button className={`w-[50%] flex items-center justify-center font-semibold ${navigatorTab == 'estimate' ? 'text-[#ee4d2d]' : 'text-gray-500'}`}
                onClick={() => setNavigatorTab('estimate')}
              >
                Ước tính chi phí
              </button>
            </div>
            <div className='w-full rounded-full h-[6px] mt-2 relative'>
              <div className={`w-[50%] h-full px-32 rounded-full absolute 
                  ${navigatorTab == 'follow' && 'left-0 transition-all duration-500'}
                  ${navigatorTab == 'estimate' && 'left-[50%] transition-all duration-500'}
                `}
              >
                <div className='w-full bg-[#ee4d2d] rounded-full h-full' />
              </div>
            </div>  
          </div>
        </div>

        <div className={`w-full top-36 fixed flex items-center justify-center
          ${navigatorTab == 'follow' && 'left-0 transition-all duration-500'}
          ${navigatorTab == 'estimate' && '-left-[100vw] transition-all duration-500'}`}
        >
          <OrderTracking />
        </div>

        <div className={`w-full top-36 fixed flex items-center justify-center
          ${navigatorTab == 'follow' && 'left-[100vw] transition-all duration-500'}
          ${navigatorTab == 'estimate' && 'left-[0] transition-all duration-500'}`}
        >
          <Estimate />
        </div>
      </div>
    </MainLayout>
  )
}
