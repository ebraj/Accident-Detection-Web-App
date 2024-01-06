"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import {
  ChevronDown,
  HeartIcon,
  Import,
  Inbox,
  Search,
  TagIcon,
  UserCircle2,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/clsxTwMerge";
import { useRouter, usePathname } from "next/navigation";
import useSidebar from "@/contexts/useSidebar";

type Props = {};

const routes = [
  {
    name: "Dashboard",
    links: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
        hrefAddress: "/dashboard",
      },
      {
        label: "Recent Updates",
        icon: TagIcon,
        href: "recent-updates",
        hrefAddress: "/dashboard/recent-updates",
      },
      {
        label: "All Datas",
        icon: Inbox,
        href: "all-datas",
        hrefAddress: "/dashboard/all-datas",
      },
    ],
  },
];

export default function MobileSidebar({}: Props) {
  const { showSidebar, setShowSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={cn("hidden md:block", showSidebar ? "block" : "hidden")}>
      <div className="fixed scrollbar scrollbar-medium scrollbar-thumb-gray-400 scrollbar-track-gray-200 top-0 left-0 bottom-0 overflow-y-auto px-5 md:px-5 py-6 min-h-screen min-w-[280px] bg-white shadow-sm border-r-2">
        <div className="flex space-x-5 items-center justify-between pb-10">
          <Link href="/">
            <h2 className="text-xl font-black">VCD</h2>
          </Link>
          <div
            onClick={() => {
              setShowSidebar(false);
            }}
          >
            <X className="block md:hidden" />
          </div>
        </div>

        <ul>
          {routes.map((route) => (
            <Fragment key={route.name}>
              <div className="pb-5">
                {/* <p className="text-primary/80 mt-7 pb-4 text-xs font-bold tracking-wider opacity-80">
                {route.name}
              </p> */}
                <ul className="space-y-2">
                  {route.links.map((link) => (
                    <li key={link.href} className="">
                      <Link
                        href={`/dashboard/${link.href}`}
                        className={cn(
                          "offset_ring hover:bg-accent group my-0.5 flex w-full cursor-pointer justify-start rounded-lg px-3 py-2 font-medium",
                          {
                            "bg-slate-100": pathname === `${link.hrefAddress}`,
                          }
                        )}
                      >
                        <div className="flex flex-1 items-center">
                          <link.icon className="mr-3 h-5 w-5" />
                          {link.label}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
