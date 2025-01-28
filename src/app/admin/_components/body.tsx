"use client";
import { foodType } from "@/app/_components/types";
import { useEffect, useState } from "react";
import OneFood from "./onefood";
import AddOneFood from "./addOneFOod";
import EditDish from "./editDish";
export default function Body() {
  const [food, setFood] = useState<foodType[]>([]);
  const [render, setRender] = useState(false);
  const [editRender, setEditRender] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3004/food`);
      const data = await res.json();
      setFood(data);
    };
    fetchData();
  }, []);
  console.log(food);
  return (
    <div className="bg-gray-200">
      <div className="relative">
        {food?.map((foods) => (
          <div key={foods._id}>
            <OneFood
              render={render}
              setRender={setRender}
              setEditRender={setEditRender}
              ingerdients={foods.ingerdients}
              _id={foods._id}
              categoryName={foods?.category?.categoryName}
              category={foods?.category}
              foodName={foods?.foodName}
              price={foods?.price}
              image={foods?.image}
            />
            {/* <h1>{food.category}</h1> */}
          </div>
        ))}
        <div className="absolute top-[-60px] left-[400px]">
          {render && <AddOneFood setRender={setRender} />}
          {editRender && <EditDish />}
        </div>
      </div>
    </div>
  );
}
