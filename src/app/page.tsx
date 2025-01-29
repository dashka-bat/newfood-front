"use client";
import { useState, useEffect } from "react";
import { CategoryType } from "./_components/types";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { Badge } from "@/components/ui/badge";
import { foodType } from "./_components/types";
export default function Home() {
  const [categories, setCategory] = useState<CategoryType[]>([]);
  const [oneFood, setOneFood] = useState<foodType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3004/food`);
      const data = await res.json();
      setOneFood(data);
    };
    fetchData();
  }, []);
  // const addCategory = async () => {
  //   const res = await fetch(`http://localhost:8000/food-category`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //     body: JSON.stringify({ categories }),
  //   });
  //   const data = await res.json();
  //   setCategory([...categories, data.foodname]);
  // };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3004/food-category`);
      const data = await res.json();
      setCategory(data);
    };
    fetchData();
  }, []);
  console.log(oneFood);
  return (
    <div>
      <Header />
      <div>
        <img
          className="w-screen"
          src="https://res.cloudinary.com/dxkgrtted/image/upload/v1737306582/Image_e4pmho.png"
        ></img>
      </div>
      <div>
        Categories
        <div className="flex gap-4">
          {categories?.map((category) => (
            <div key={category._id}>
              <Badge className="text-[20px]">{category.categoryName}</Badge>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex gap-5">
          {oneFood.map((food) => (
            <div
              key={food._id}
              className="w-[300px] h-[241px] bg-white border-[2px] border-black rounded-xl "
            >
              <div>
                {food.foodName}
                <div>
                  {" "}
                  <img
                    className="w-[230px] h-[150px]"
                    src={food.image || null}
                    alt="food"
                  />
                </div>
                <div>{food.ingerdients}</div>
                <div>{food.price}$</div>
              </div>{" "}
              <div> </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
