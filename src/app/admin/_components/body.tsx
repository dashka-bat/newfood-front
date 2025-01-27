"use client";
import { foodType } from "@/app/_components/types";
import { useEffect, useState } from "react";
export default function Body() {
  const [food, setFood] = useState<foodType[]>([]);
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
    <div>
      {food?.map((food) => (
        <div key={food._id} className="border-[2px] border-gray-500 rounded-xl">
          <img className="w-[270px] h-[241px]" src={food.image} alt="food" />
          <h1>{food.foodName}</h1>
          <h1>{food.price}$</h1>
          <h1>{food.ingerdients}</h1>
          <h1>{food.category}</h1>
        </div>
      ))}
    </div>
  );
}
