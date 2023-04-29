'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModals';
import useLoginModal from '@/app/hooks/useLoginModals';

import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
export interface UserMenuProps {
  currentUser?: SafeUser | null;
}
function UserMenu({ currentUser }: UserMenuProps) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  console.log(currentUser);
  return (
    <div className='relative '>
      <div className='flex flex-row items-center gap-3 '>
        <div
          className='hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100'
          onClick={() => {}}
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className=' p-4 md:p-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className=' absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm bg-white'>
          <div className='flex flex-col cursor-pointer '>
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label='My trips' />
                <MenuItem onClick={() => {}} label='My favorites' />
                <MenuItem onClick={() => {}} label='My reservations' />
                <MenuItem onClick={() => {}} label='My properties' />
                <MenuItem onClick={() => {}} label='Airbnb my home' />
                <hr />
                <MenuItem onClick={() => signOut()} label='logout' />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label='login' />
                <MenuItem onClick={registerModal.onOpen} label='sign up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default UserMenu;
