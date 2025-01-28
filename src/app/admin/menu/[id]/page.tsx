"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import AddOneFood from "../../_components/addOneFOod";
import Body from "../../_components/body";
import { Card } from "@/components/ui/card";
export default function Page() {
  const params = useParams();
  const [food, setFood] = useState<any>();
  const [foodCategory, setFoodCategory] = useState<any>();
  const fetchData = async () => {
    const res = await fetch(`http://localhost:3004/food-category/${params.id}`);
    const data = await res.json();
    setFoodCategory(data);
  };
  const fetchFood = async () => {
    const res = await fetch(`http://localhost:3004/food`);
    const data = await res.json();
    setFood(data);
  };
  useEffect(() => {
    fetchData();
    fetchFood();
  }, []);
  console.log(foodCategory);
  console.log(food);

  return (
    <div>
      <div>
        <Card></Card>
        <div>
          {food
            ?.filter((foods: any) => params.category == food.category)
            .map((foods: any) => (
              <div key={foods._id}>
                <Body />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
