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
  const [video, setVideo] = useState<any>();
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

  console.log("rendered");
  useEffect(() => {}, [video]);
  return (
    <>
      <main className="grid grid-cols-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Image</label>
            <input type="file" {...register("image")} />
          </div>
          <button>Submit</button>
        </form>

        <div>{video && <img src={video} alt="" />}</div>
      </main>
    </>
  );
};

export default InputForm;
