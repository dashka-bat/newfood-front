"use client";
import { foodType } from "@/app/_components/types";
import { useEffect, useState } from "react";
import OneFood from "./onefood";
import AddOneFood from "./addOneFOod";
import EditDish from "./editDish";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";

export default function Body() {
  const [food, setFood] = useState<foodType[]>([]);
  const [editRender, setEditRender] = useState(false);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:3004/food?category=${category}`
      );
      const data = await res.json();
      setFood(data);
    };
    fetchData();
  }, [category]);
  console.log(category);

  return (
    <div className="bg-gray-200">
      <Dialog>
        <DialogTrigger asChild>
          <div>+ add new dish to</div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <p>This is the content of the dialog.</p>
          <AddOneFood />
        </DialogContent>
      </Dialog>
      <div className="relative">
        {food?.map((foods) => (
          <div key={foods._id}>
            <OneFood
              setEditRender={setEditRender}
              ingerdients={foods.ingerdients}
              _id={foods._id}
              categoryName={foods?.category?.categoryName}
              category={foods?.category}
              foodName={foods?.foodName}
              price={foods?.price}
              image={foods?.image || null}
              categoryid={foods?.category?._id || null}
            />
            {/* <h1>{food.category}</h1> */}{" "}
            <div className="absolute top-[-60px] left-[400px]">
              {editRender && <EditDish />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
