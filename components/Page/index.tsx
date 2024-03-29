import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <div className="w-100 flex items-center p-8">
      <a href="/">
        <Image
          className="mr-2"
          src="/wippy.svg"
          alt="Wippy Logo"
          height={36}
          width={24}
        />
      </a>
    </div>
  );
};

export const Page = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="m-auto h-screen max-w-4xl">
      <Navbar />
      <div className="w-100 px-8 pb-8">{children}</div>
    </div>
  );
};
