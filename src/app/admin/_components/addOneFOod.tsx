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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { foodType } from "@/app/_components/types";

export default function AddOneFood() {
  const [image, setImage] = useState("");
  const [oneFood, setOneFood] = useState<foodType[]>([]);
  const [foodname, setFoodname] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState([]);
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

        if (!response.ok) throw new Error("Image upload failed");

        const dataJson = await response.json();
        setImage(dataJson.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };
  const addFood = async () => {
    const response = await fetch("http://localhost:3004/food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodName: foodname,
        price: price,
        image: image,
        ingerdients: ingredients,
        category: category,
      }),
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3004/food`);
      const data = await res.json();
      console.log(data);
      setOneFood([
        ...oneFood,
        data.foodName,
        data.price,
        data.ingerdients,
        data.image,
        data.category,
      ]);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Food Name</Label>
                <Input
                  onChange={(e) => {
                    setFoodname(e.target.value);
                  }}
                  id="name"
                  placeholder="Name of your project"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Food price</Label>
                <Input
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  id="name"
                  placeholder="Name of your project"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">ingredients</Label>
                <Input
                  onChange={(e) => {
                    setIngredients(e.target.value);
                  }}
                  id="name"
                  placeholder="Name of your project"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                {image && <img src={image} alt="food" />}
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={handleUpload}
                  type="file"
                  id="name"
                  placeholder="Name of your project"
                />
              </div>
              {/* <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={addFood}>Add Dish</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
