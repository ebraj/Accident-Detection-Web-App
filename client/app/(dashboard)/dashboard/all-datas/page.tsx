import dynamic from "next/dynamic";
import React from "react";
// import DataTable from "@/components/dashboard/DataTable";
const DataTable = dynamic(() => import("@/components/dashboard/DataTable"), {
  ssr: false,
});
const OgDataTable = dynamic(
  () => import("@/components/dashboard/OgDataTable"),
  {
    ssr: false,
  }
);

type Props = {};

export default function AllDatas({}: Props) {
  return (
    <div>
      <OgDataTable />
    </div>
  );
}
