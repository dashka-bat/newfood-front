import { foodType } from "@/app/_components/types";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import AddOneFood from "./addOneFOod";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function OneFood({
  foodName,
  price,
  image,
  category,
  _id,
  ingerdients,
  categoryName,
  setEditRender,
  categoryid,
}: any) {
  const item = {
    foodName,
    price,
    image,
    category,
    _id,
    ingerdients,
    categoryName,
    categoryid,
  };

  return (
    <div className="bg-white mb-5 border-[1px] rounded-xl h-fit">
      <div className="text-[40px] ml-5">{item.categoryName}</div>
      <div className="flex gap-5">
        <div className="w-[270px] h-[240px] border-[2px] border-red-500 border-dashed  rounded-xl flex flex-col items-center justify-center ml-5"></div>
        <Card className="w-[270px] mb-5 relative">
          <img
            className="w-[240px] h-[130px] rounded-xl ml-3 mt-2"
            src={item.image || null}
            alt="food"
          ></img>
          <div className="flex justify-between ml-5 mr-5">
            <div className="text-red-400">{item.foodName}</div>
            <div>${item.price}</div>
          </div>

          <div className="mr-5 ml-5">{item.ingerdients}</div>
          <button
            onClick={() => setEditRender(true)}
            className="bg-white absolute top-20 right-7 w-[40px] h-[40px] flex justify-center items-center rounded-2xl "
          >
            <Pencil className="text-red-500" />
          </button>
        </Card>
      </div>
    </div>
  );
}
