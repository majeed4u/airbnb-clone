'use client';
import * as React from 'react';

export interface IContainerProps {}

function Container({ children }: React.PropsWithChildren<IContainerProps>) {
  return (
    <div className=' max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
      {children}
    </div>
  );
}

export default Container;
