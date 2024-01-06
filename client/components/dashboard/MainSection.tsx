import React from "react";
import TopNavbar from "./TopNavbar";
type Props = {
  children: React.ReactNode;
};

export default function MainSection({ children }: Props) {
  return (
    <div className="w-full md:ml-[280px]">
      <TopNavbar />
      <div className="p-5">
        <h2>Ebraj.</h2>
      </div>
    </div>
  );
}
