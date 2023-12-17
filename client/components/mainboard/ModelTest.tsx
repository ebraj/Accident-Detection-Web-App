import React from "react";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import InputForm from "../InputForm";
type Props = {};

export default function ModelTest({}: Props) {
  return (
    <section id="model-test">
      <MaxWidthContainer className="py-10">
        <h2 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl pb-8">
          Give our a model a try!
        </h2>
        <InputForm />
      </MaxWidthContainer>
    </section>
  );
}
