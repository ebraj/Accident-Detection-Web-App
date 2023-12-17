import Image from "next/image";
import InputForm from "@/components/InputForm";
import Hero from "@/components/mainboard/Hero";
import Features from "@/components/mainboard/Features";
import ModelTest from "@/components/mainboard/ModelTest";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ModelTest />
    </>
  );
}
