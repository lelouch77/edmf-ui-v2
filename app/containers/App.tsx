import React, { ReactNode } from 'react';
import Navbar from './Navbar';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return (
      <div className="bg-white h-full flex">
        <Navbar/>
        {children}
     </div>
  );
}
