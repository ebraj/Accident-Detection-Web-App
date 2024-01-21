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
        `http://127.0.0.1:8080/api/accident-d/${params.accidentId}`
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
          <GridContainer className="lg:grid-cols-2">
            {/* Map Section */}
            <div>
              <CustomMap />
            </div>

            {/* Other details section */}
            <div></div>
          </GridContainer>
        </>
      )}
    </div>
  );
}
