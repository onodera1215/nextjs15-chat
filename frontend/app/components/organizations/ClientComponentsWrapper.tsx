"use client";

import Content from "../molecules/Content";
import Sidebar from "../molecules/Sidebar";

export default function ClientComponentsWrapper({ children }: { children: React.ReactNode }) {

  const onAddChannelButtonClick = () => {
    console.log("Add Channel Button Clicked");
  }

  const onAddUserButtonClick = () => {
    console.log("Add User Button Clicked");
  }
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="hidden lg:col-span-3 lg:block bg-surface ">
          <Sidebar onAddChannelButtonClick={onAddChannelButtonClick} onAddUserButtonClick={onAddUserButtonClick} />
        </div>
        <div className="lg:col-span-9 block col-span-12">
          <Content>{children}</Content>
        </div>
      </div>
    </>
  );
}