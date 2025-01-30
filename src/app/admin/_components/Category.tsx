"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AddCategory } from "./addCategory";
import Link from "next/link";
import { useAuthFetch } from "@/app/_components/useFetchData";
type category = {
  categoryName: string;
  _id: string;
};
export default function Category(setModalOpen: any) {
  const [category, setCategory] = useState<category[]>([]);
  const [submit, setSubmit] = useState("");

  const addCategory = async () => {
    const response = await fetch("http://localhost:3004/food-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName: submit }),
    });
    const data = await response.json();
    setCategory([...category, data.foodname]);
  };
  // const data: any = useAuthFetch(`food-category`);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3004/food-category");
      const data = await response.json();

      setCategory(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Link href={`/admin/menu?category=`}>
        <Badge>all dishes</Badge>
      </Link>

      {category?.map((foodcategory) => (
        <Link
          href={`/admin/menu?category=${foodcategory._id}`}
          key={foodcategory._id}
        >
          <Badge
            className=" hover:bg-white hover:text-black"
            key={foodcategory._id}
            // onClick={() => {
            //   const searchParams = new URLSearchParams();
            //   searchParams.set("category", foodcategory._id);
            // }}
          >
            {foodcategory.categoryName}
          </Badge>
        </Link>
      ))}
      <div>
        <AddCategory
          setModalOpen={setModalOpen}
          addCategory={addCategory}
          setSubmit={setSubmit}
        />
      </div>
    </div>
  );
}
