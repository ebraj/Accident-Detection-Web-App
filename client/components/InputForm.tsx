"use client";
import { useForm, SubmitHandler, set } from "react-hook-form";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type FormProps = {
  image: string;
};

const InputForm = () => {
  const [video, setVideo] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    console.log(data.image[0]);
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await fetch("http://127.0.0.1:8080/api/upload-video", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/form-data",
        // },
        body: formData,
      });
      const results = await response.json();
      console.log(results);
      if (results.status === "success") {
        const new_api = await fetch(
          `http://127.0.0.1:8080/api/show-video/static/videos/${results.path}`,
          {
            method: "GET",
          }
        );
        console.log(new_api);
        setVideo(new_api.url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {}, [video]);
  return (
    <>
      <main className="max-w-[900px] min-h-[400px] mx-auto">
        {video ? (
          <div className="w-full min-h-[200px] md:min-h-[400px] border-4 rounded-md border-dashed p-1">
            {video && (
              <img
                src={video}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="image"
                className="uppercase min-h-[200px] md:min-h-[400px] py-10 border-4 rounded-lg border-dashed bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                {video ? "Uploaded Successfully" : "Click to upload"}
              </label>
              <input
                type="file"
                {...register("image")}
                id="image"
                className="hidden"
              />
            </div>
            <button
              type="submit"
              className="font-bold py-4 px-8 bg-gray-900 rounded-md text-white w-full"
            >
              Submit this Video
            </button>
          </form>
        )}
      </main>
    </>
  );
};

export default InputForm;
