import React from 'react'
import HomeSidebar from '../home/HomeSidebar';

import HomeHeader from '../home/HomeHeader';

type Props = {}

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <HomeSidebar />
      <div className="w-full">
        <HomeHeader />
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout