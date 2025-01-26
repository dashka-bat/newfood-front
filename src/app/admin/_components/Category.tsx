"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AddCategory } from "./addCategory";
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
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3004/food-category");
      const data = await response.json();

      setCategory(data);
    };
    fetchData();
  }, []);
  console.log(category);
  return (
    <div>
      {category?.map((foodcategory) => (
        <Badge key={foodcategory._id}>{foodcategory.categoryName}</Badge>
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
