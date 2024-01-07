import dynamic from "next/dynamic";
import React from "react";
// import DataTable from "@/components/dashboard/DataTable";
const DataTable = dynamic(() => import("@/components/dashboard/DataTable"), {
  ssr: false,
});

type Props = {};

export default function AllDatas({}: Props) {
  return (
    <div>
      <DataTable />
    </div>
  );
}
