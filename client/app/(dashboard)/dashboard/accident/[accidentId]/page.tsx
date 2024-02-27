"use client";

import GridContainer from "@/components/layouts/GridContainer";
import dynamic from "next/dynamic";
const CustomMap = dynamic(() => import("@/components/misc/CustomMap"), {
  ssr: false,
});
import React from "react";
import { useQuery } from "@tanstack/react-query";

type Props = {};

export default function SingleAccidentPage({ params }: any) {
  const {
    data: singleAccident,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["accident", params.accidentId],
    queryFn: async () => {
      const response = await fetch(
        `http://127.0.0.1:8080/api/v1/accident/${params.accidentId}`
      );
      return await response.json();
    },
  });
  console.log(singleAccident);
  return (
    <div>
      <h2 className="text-xl sm:text-2xl pb-5">Accident Details</h2>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {/* Other details section */}
          <GridContainer className="items-stretch">
            <div className="bg-white shadow-sm p-5 break-all">
              {singleAccident?.data?.address}
            </div>
            <div className="bg-white shadow-sm p-5 break-all">
              {singleAccident?.data?.longitude}
            </div>
            <div className="bg-white shadow-sm p-5 break-all">
              {singleAccident?.data?.latitude}
            </div>
            <div className="bg-white shadow-sm p-5 break-all">
              {singleAccident?.data?.severty}
            </div>
            <div className="bg-white shadow-sm p-5 break-all">
              {singleAccident?.data?.severtyInPercentage}
            </div>
          </GridContainer>
          {/* Map Section */}
          <div className="pt-8">
            <CustomMap />
          </div>
        </>
      )}
    </div>
  );
}
