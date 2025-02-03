"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { foodType } from "@/app/_components/types";
import { Token } from "@clerk/nextjs/server";

interface Props {
  categoryid: string;
}

export default function AddOneFood({ categoryid }: Props) {
  const [image, setImage] = useState("");
  const [foodname, setFoodname] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "food-delivery");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dxkgrtted/upload`,
          { method: "POST", body: data }
        );

        if (!response.ok)
          throw new Error("Зураг байршуулалт амжилтгүй боллоо.");

        const dataJson = await response.json();
        setImage(dataJson.secure_url);
      }
    } catch (error) {
      console.error("Зураг байршуулалт алдаа:", error);
      alert("Зураг байршуулахад алдаа гарлаа. Дахин оролдоно уу.");
    }
  };
  const addFood = async () => {
    try {
      const food = {
        foodName: foodname,
        price: Number(price),
        image,
        ingredients: ingredients,
        category: categoryid, // category зөв дамжуулалт
      };

      const response = await fetch("http://localhost:3004/food", {
        method: "POST",
        headers: {
          Token: token,
        },
        body: JSON.stringify(food),
      });

      if (!response.ok) throw new Error("Хоол нэмэхэд алдаа гарлаа.");

      alert("Хоол амжилттай нэмэгдлээ!");
      setFoodname("");
      setPrice("");
      setIngredients("");
      setImage("");
    } catch (error) {
      console.error("Хоол нэмэхэд алдаа:", error);
      alert("Хоол нэмэхэд алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex justify-between mr-3 ml-3">
            <CardTitle>Шинэ хоол нэмэх</CardTitle>
          </div>
          <CardDescription>Хоолны мэдээллийг оруулна уу.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Хоолны нэр</Label>
                <Input
                  value={foodname}
                  onChange={(e) => setFoodname(e.target.value)}
                  id="name"
                  placeholder="Хоолны нэр"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Хоолны үнэ</Label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  id="price"
                  placeholder="Хоолны үнэ"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ingredients">Орц</Label>
                <Input
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  id="ingredients"
                  placeholder="Орц"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                {image && (
                  <img className="w-[240px] h-[200px]" src={image} alt="food" />
                )}
                <Label htmlFor="file">Зураг байршуулах</Label>
                <Input
                  onChange={handleUpload}
                  type="file"
                  accept="image/*"
                  id="file"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={addFood}>Хоол нэмэх</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
