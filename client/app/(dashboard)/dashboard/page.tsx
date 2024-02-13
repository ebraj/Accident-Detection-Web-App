"use client";
import React from "react";
import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";
import TopNavbar from "@/components/dashboard/TopNavbar";
import Link from "next/link";
import { X } from "lucide-react";
import useSidebar from "@/contexts/useSidebar";
import { SimpleChart } from "@/components/charts/SimpleChart";
type Props = {};

export default function page({}: Props) {
  const { showSidebar, setShowSidebar } = useSidebar();
  return (
    <>
      <SimpleChart />
    </>
  );
}
