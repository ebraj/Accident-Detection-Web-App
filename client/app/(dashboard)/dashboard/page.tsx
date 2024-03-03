"use client";
import { SimpleChart } from "@/components/charts/SimpleChart";
import CustomChart from "@/components/charts/CustomChart";
import { useQuery } from "@tanstack/react-query";
type Props = {};

export default function Page({}: Props) {
  const {
    data: accidents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["accidents"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8080/api/v1/accident/all");
      return await response.json();
    },
  });
  return (
    <>
      {/* <SimpleChart /> */}
      <h2 className="text-xl sm:text-2xl pb-5 font-bold underline">
        Accidents Overview(Per month)
      </h2>
      {accidents?.datas && <CustomChart datas={accidents?.datas} />}
    </>
  );
}
