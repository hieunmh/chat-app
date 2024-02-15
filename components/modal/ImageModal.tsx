'use client';

import Modal from './Modal';
import { IoClose } from 'react-icons/io5';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

interface ImageModalProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, isOpen, onClose }) => {


  if (!src) {
    return null;
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' onClose={onClose} className='relative z-50'>
        <Transition.Child as={Fragment} enter='ease-out duration-300'
          enterFrom='opacity-0' enterTo='opacity-100'
          leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black backdrop-blur-xl bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0'>
          <div className='flex items-center justify-center min-h-full'>
            <Transition.Child as={Fragment} enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translatey-0 sm:scale-95'
            >
              <Dialog.Panel>
                <div className='z-50 flex items-center justify-center'> 
                  <button onClick={onClose}
                    className='rounded-full absolute top-3 left-3 bg-black/50 hover:bg-black/40 p-2 outline-none'
                  >
                    <span className='sr-only'>Close</span>
                    <IoClose className='h-6 w-6 text-gray-400' />
                  </button> 

                  <div className='h-full aspect-auto z-50'>
                    <img src={src} alt='image' className='h-full aspect-auto' />
                  </div>  
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    
  )
}
 
export default ImageModal;