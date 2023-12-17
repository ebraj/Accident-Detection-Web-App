import React from "react";
import { Github, Linkedin, Twitter, Facebook } from "lucide-react";
import { allPages, allResources, allContacts } from "@/datas/footerItems";
import Link from "next/link";
import MaxWidthContainer from "./MaxWidthContainer";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="bg-gray-900 p-5 text-gray-100">
      <MaxWidthContainer>
        <div className="">
          {/* Upper Section */}
          {/* <div className='flex flex-col items-center justify-between space-y-5 sm:flex-row sm:space-y-0'>
            <h2 className='font-black'>कलाक्षेत्र ✍️</h2>
            <ul className='flex items-center justify-between space-x-5'>
              <li>
                <Github />
              </li>
              <li>
                <Linkedin />
              </li>
              <li>
                <Twitter />
              </li>
              <li>
                <Facebook />
              </li>
            </ul>
          </div> */}

          {/* Middle Section */}
          {/* <div className='flex w-full flex-col justify-between space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0'>
            <div className='flex space-x-[100px]'>
              <div className='space-y-4'>
                <h3 className=''>Company</h3>
                <ul className='space-y-2 text-gray-400'>
                  {allPages.map((single, index) => {
                    return (
                      <Link
                        href={single.link}
                        className='block hover:text-gray-100'
                        key={index}
                      >
                        <li key={index}>{single.title}</li>
                      </Link>
                    )
                  })}
                </ul>
              </div>
              <div className='space-y-4'>
                <h3 className=''>Resources</h3>
                <ul className='space-y-2 text-gray-400'>
                  {allResources.map((single, index) => {
                    return (
                      <Link
                        href={single.link}
                        key={index}
                        className='block hover:text-gray-100'
                      >
                        <li key={index}>{single.title}</li>
                      </Link>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div className='pr-[5px]'>
              <div className='space-y-4'>
                <h3 className=''>Contact</h3>
                <ul className='space-y-2 text-gray-400'>
                  {allContacts.map((single, index) => {
                    return <li key={index}>{single.title}</li>
                  })}
                </ul>
              </div>
            </div>
          </div> */}

          {/* Lower Section */}
          <div className=" border-gray-800 text-center">
            <p className="text-gray-400 text-lg">
              All rights reserved. VCD ❤️‍🔥 {new Date().getFullYear()}.
              {/* Built with ❤️‍🔥 by{" "}
          <Link href={"https://github.com/ebraj"} target="_blank">
            <span className="text-gray-100 ">Ebraj.</span>
          </Link> */}
            </p>
          </div>
        </div>
      </MaxWidthContainer>
    </footer>
  );
}
