import React from "react";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import {
  Map,
  Cctv,
  LocateFixed,
  FireExtinguisher,
  BellRing,
} from "lucide-react";

type Props = {};

const allFeatures = [
  {
    icon: Cctv,
    title: "Real-time Accident Detection",
    description:
      "Real-time accident detection using advanced deep learning (CNN) on CCTV camera video.",
  },
  {
    icon: LocateFixed,
    title: "Location Identification",
    description:
      "Integrated location services pinpoint accident locations, vital for swift emergency response.",
  },
  {
    icon: FireExtinguisher,
    title: "Emergency Alert Generation",
    description:
      "Post-accident detection, the system sends rapid emergency alerts to authorities with location information for prompt response.",
  },
  {
    icon: BellRing,
    title: "Integration with Communication Channels",
    description:
      "Integrated with SMS, the system sends video links notifying traffic authorities for coordinated accident response.",
  },
];

export default function Features({}: Props) {
  return (
    <section>
      <MaxWidthContainer className="py-10">
        <h2 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl pb-8">
          Our Selected Features
        </h2>
        <section className="pb-[60px] sm:pb-[70px] md:pb-[80px]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allFeatures.map((singleFeature, index) => {
              return (
                <div
                  key={index}
                  className="space-y-3 rounded-md bg-red-100/40 p-3 sm:p-5"
                >
                  <div className="text-2xl text-center">
                    {<singleFeature.icon className="w-12 h-12 text-gray-600" />}
                  </div>
                  <h2 className="text-xl font-bold">{singleFeature.title}</h2>
                  <p className="text-gray-700">{singleFeature.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </MaxWidthContainer>
    </section>
  );
}
