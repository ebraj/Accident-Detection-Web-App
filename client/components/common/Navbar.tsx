import React from "react";
import { LogIn } from "lucide-react";
import Link from "next/link";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import Button from "../reusables/cva-button";

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
              <Link href={"/auth/register"}>
                <Button variant={"defaultOutline"}>Register</Button>
              </Link>
            </li>
            <li>
              <Link href={"/auth/login"}>
                <Button variant={"secondary"} className="">
                  Login
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </MaxWidthContainer>
    </main>
  );
}
