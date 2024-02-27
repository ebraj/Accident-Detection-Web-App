import React from "react";
import TopNavbar from "./TopNavbar";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
type Props = {
  children: React.ReactNode;
};

export default function MainSection({ children }: Props) {
  return (
    <div className="w-full lg:ml-[280px]">
      <TopNavbar />
      <MaxWidthContainer className="py-6">{children}</MaxWidthContainer>
    </div>
  );
}
