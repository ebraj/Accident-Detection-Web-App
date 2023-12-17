import React from "react";
import { LogIn } from "lucide-react";
import Link from "next/link";
import MaxWidthContainer from "../layouts/MaxWidthContainer";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <main className="bg-gray-900 py-4 text-gray-100 border-b-2 border-gray-800">
      <MaxWidthContainer>
        <nav className="flex flex-row items-center justify-between ">
          <Link href="/">
            <h2 className="text-xl font-black">VCD</h2>
          </Link>

          <ul className="flex items-center justify-center space-x-2">
            <li>
              <Link href={"/auth/login"}>
                <button className="w-full py-2 rounded-md border px-8 transition-all hover:scale-105">
                  Register
                </button>
              </Link>
            </li>
            <li>
              <Link href={"/auth/login"}>
                <button className="w-full py-2 rounded-md border-2 border-red-500 bg-gradient-to-r from-red-500 to-orange-700 px-8 transition-all hover:scale-105">
                  Login
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </MaxWidthContainer>
    </main>
  );
}
