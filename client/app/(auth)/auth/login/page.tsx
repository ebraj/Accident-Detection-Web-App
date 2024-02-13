import React from "react";
import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";
import LoginForm from "@/components/auth/LoginForm";

type Props = {};

export default function page({}: Props) {
  return (
    <MaxWidthContainer className="py-6">
      <LoginForm />
    </MaxWidthContainer>
  );
}
