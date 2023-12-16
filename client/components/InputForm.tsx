"use client";
import { useForm, SubmitHandler, set } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";

type FormProps = {
  image: string;
};

const InputForm = () => {
  const [image, setImage] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  function draw_image_and_boxes(
    file: any,
    boxes: [number, number, number, number, string][]
  ) {
    const img = new window.Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.querySelector(
        "canvas"
      ) as HTMLCanvasElement | null;

      if (!canvas) {
        console.error("Canvas not found.");
        return;
      }
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Context not found.");
        return;
      }
      ctx.drawImage(img, 0, 0);
      ctx.strokeStyle = "#00FF00";
      ctx.lineWidth = 3;
      ctx.font = "18px serif";
      boxes.forEach(([x1, y1, x2, y2, label]) => {
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        ctx.fillStyle = "#00ff00";
        const width = ctx.measureText(label).width;
        ctx.fillRect(x1, y1, width + 10, 25);
        ctx.fillStyle = "#000000";
        ctx.fillText(label, x1, y1 + 18);
      });
    };
  }

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    console.log(data.image[0]);
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await fetch("http://127.0.0.1:8080/api/apply-model", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/form-data",
        // },
        body: formData,
      });
      const boxes = await response.json();
      draw_image_and_boxes(data.image[0], boxes);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <canvas className="w-full bg-red-100"></canvas>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Image</label>
          <input type="file" {...register("image")} />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default InputForm;
