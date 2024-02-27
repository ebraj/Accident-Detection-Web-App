"use client";

import GridContainer from "@/components/layouts/GridContainer";
import dynamic from "next/dynamic";
const CustomMap = dynamic(() => import("@/components/misc/CustomMap"), {
  ssr: false,
});
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

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
      <h2 className="text-xl sm:text-2xl pb-5 font-bold underline">
        Accident Details
      </h2>
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
              {singleAccident?.data?.severity}
            </div>
            <div className="bg-white shadow-sm p-5 break-all">
              {singleAccident?.data?.severityInPercentage}
            </div>
            <div className="bg-white shadow-sm p-5 break-all">
              {singleAccident?.data?.date}
            </div>
          </GridContainer>
          {/* Map Section */}
          <div className="pt-8 space-y-8">
            <CustomMap />
          </div>
          <div className="pt-8 space-y-8">
            <h2 className="text-xl sm:text-2xl font-bold underline">
              Accident Images
            </h2>
            <div>
              {singleAccident?.data?.image_url && (
                <Image
                  src={singleAccident?.data?.image_url}
                  width={1000}
                  height={600}
                  alt={""}
                  className="w-full h-full object-cover rounded-md"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
