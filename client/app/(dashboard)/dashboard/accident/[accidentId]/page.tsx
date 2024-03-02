"use client";

import GridContainer from "@/components/layouts/GridContainer";
import dynamic from "next/dynamic";
const CustomMap = dynamic(() => import("@/components/misc/CustomMap"), {
  ssr: false,
});
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { sendQuickMail } from "@/actions/quick-mail";
import { useForm } from "react-hook-form";
import { rescueTeamLists, RescueTeam } from "@/datas/rescueTeams";
import toast from "react-hot-toast";

type Props = {};

export default function SingleAccidentPage({ params }: any) {
  const [checkedItems, setCheckedItems] = useState(rescueTeamLists);
  const [allChecked, setAllChecked] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  const handleCheckAll = () => {
    setAllChecked(!allChecked);
    const newRescueTeamList = rescueTeamLists.map((rescueTeam) => {
      rescueTeam.isChecked = !allChecked;
      return rescueTeam;
    });
    setCheckedItems(newRescueTeamList);
  };

  const handleCheckboxChangeFinal = (id: string) => {
    const newRescueTeamList = rescueTeamLists.map((rescueTeam) => {
      if (rescueTeam.id === id) {
        rescueTeam.isChecked = !rescueTeam.isChecked;
      }
      return rescueTeam;
    });
    setCheckedItems(newRescueTeamList);
  };

  useEffect(() => {
    const isEveryChecked = checkedItems.every(
      (rescueTeam) => rescueTeam.isChecked
    );
    setAllChecked(isEveryChecked);
  }, [checkedItems]);

  const onSubmit = async () => {
    const { latitude, longitude, address } = singleAccident?.data;
    const response = await sendQuickMail({
      checkedItems,
      latitude,
      longitude,
      address,
    });

    if (response) {
      toast.success("Mail Sent Successfully");
    } else {
      toast.error("Mail Sent Failed");
    }
  };

  return (
    <section>
      <div className="ml-auto pb-8">
        <div>
          <fieldset className="border-4 border-dashed rounded-md">
            <legend className="pb-4 text-xl sm:text-2xl font-bold underline">
              Rescue Team
            </legend>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="sm:items-center space-y-5 sm:space-y-0 flex sm:space-between p-5 flex-col sm:flex-row"
            >
              <div className="sm:space-x-5 space-y-2 sm:space-y-0 items-start flex flex-col sm:flex-row">
                <label className="inline-block space-x-2 flex items-center justify-center">
                  <input
                    className="w-5 h-5 inline-block"
                    type="checkbox"
                    checked={allChecked}
                    onChange={handleCheckAll}
                  />
                  <span>All</span>
                </label>
                {rescueTeamLists.map((rescueTeam, index) => {
                  return (
                    <label
                      key={index}
                      className="inline-block space-x-2 flex items-center justify-center"
                    >
                      <input
                        className="w-5 h-5 inline-block"
                        type="checkbox"
                        id={rescueTeam.id}
                        checked={rescueTeam.isChecked}
                        onChange={(e) => {
                          handleCheckboxChangeFinal(rescueTeam.id);
                        }}
                      />
                      <span>{rescueTeam.name}</span>
                    </label>
                  );
                })}
              </div>

              <Button
                className="sm:ml-auto"
                disabled={isLoading || !singleAccident?.data}
              >
                Quick Mail
              </Button>
            </form>
          </fieldset>
        </div>
      </div>
      <div>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl pb-5 font-bold underline">
              Accident Details
            </h2>
            <div>
              {/* Other details section */}
              <GridContainer className="items-stretch">
                <div className="bg-white shadow-sm p-5 break-all">
                  <h3 className="font-bold text-xl pb-1 underline">Address</h3>
                  <p>{singleAccident?.data?.address}</p>
                </div>
                <div className="bg-white shadow-sm p-5 break-all">
                  <h3 className="font-bold text-xl pb-1 underline">
                    Longitude
                  </h3>
                  {singleAccident?.data?.longitude}
                </div>
                <div className="bg-white shadow-sm p-5 break-all">
                  <h3 className="font-bold text-xl pb-1 underline">Latitude</h3>
                  {singleAccident?.data?.latitude}
                </div>
                <div className="bg-white shadow-sm p-5 break-all">
                  <h3 className="font-bold text-xl pb-1 underline">Severity</h3>
                  {singleAccident?.data?.severity}
                </div>
                <div className="bg-white shadow-sm p-5 break-all">
                  <h3 className="font-bold text-xl pb-1 underline">
                    Severity In Percentage
                  </h3>
                  {singleAccident?.data?.severityInPercentage} %
                </div>
                <div className="bg-white shadow-sm p-5 break-all">
                  <h3 className="font-bold text-xl pb-1 underline">Date</h3>
                  {singleAccident?.data?.date}
                  {/* {format(
                new Date(singleAccident?.data?.date).toLocaleString(),
                "MMMM d, yyyy h:mm:ss a"
              )} */}
                </div>
              </GridContainer>
            </div>
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
    </section>
  );
}
