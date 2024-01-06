"use client";
import React from "react";
import { Bell, LogIn } from "lucide-react";
import Link from "next/link";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import { BellRing } from "lucide-react";
import { Menu } from "lucide-react";
import useSidebar from "@/contexts/useSidebar";

type Props = {};

export default function TopNavbar({}: Props) {
  const { showSidebar, setShowSidebar } = useSidebar();
  return (
    <main className="bg-white py-4 border-b-2">
      <MaxWidthContainer className="max-w-none md:px-5">
        <nav className="flex flex-row items-center justify-between ">
          <div>
            <div
              className="block md:hidden"
              onClick={() => {
                setShowSidebar(true);
              }}
            >
              <Menu />
            </div>
          </div>

          <ul className="flex items-center justify-center space-x-6">
            <li>
              <BellRing />
            </li>
            <li className="ring rounded-full p-0.5 ring-orange-400">
              <button className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-700 transition-all hover:scale-105">
                A
              </button>
            </li>
          </ul>
        </nav>
      </MaxWidthContainer>
    </main>
  );
}
