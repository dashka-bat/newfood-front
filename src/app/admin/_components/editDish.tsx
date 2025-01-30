"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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

export default function EditDish(food: any) {
  const [image, setImage] = useState<any>(food.image);
  const [foodName, setFoodName] = useState<string>(food?.foodName);
  const [price, setPrice] = useState<number | string>(food.price);
  const [ingredients, setIngredients] = useState<string>(food.ingredients);
  const [categoryId, setCategoryId] = useState<any>(food.categoryId);
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Food_delivery");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/df88yvhqr/upload`,
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
  return (
    <div>
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <div className="flex justify-between mr-3 ml-3">
              <CardTitle>Create project</CardTitle>
              {/* <Button
                    onClick={() => setRender(false)}
                    className="w-[30px] h-[30px]"
                  >
                    X
                  </Button> */}
            </div>

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
                    value={foodName}
                    // onChange={(e) => {
                    //   setFoodname(e.target.value);
                    // }}
                    id="name"
                    placeholder="Name of your project"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Food price</Label>
                  <Input
                    value={price}
                    // onChange={(e) => {
                    //   setPrice(e.target.value);
                    // }}
                    id="name"
                    placeholder="Name of your project"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">ingredients</Label>
                  <Input
                    value={ingredients}
                    // onChange={(e) => {
                    //   setIngredients(e.target.value);
                    // }}
                    id="name"
                    placeholder="Name of your project"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  {/* {image && (
                        <img className="w-[240px] h-[200px]" src={image} alt="food" />
                      )} */}
                  <Label htmlFor="file">Name</Label>
                  <Input
                    onChange={handleUpload}
                    type="file"
                    accept="image/*"
                    id="file"
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
            <Button>Add Dish</Button>
          </CardFooter>
        </Card>
      </div>
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex justify-between mr-3 ml-3">
            <CardTitle>Dishes info</CardTitle>
            {/* <Button
              onClick={() => setRender(false)}
              className="w-[30px] h-[30px]"
            >
              X
            </Button> */}
          </div>

          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Dish Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Dish Category</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">ingredients</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">price</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">ingredients</Label>
                <Input
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
          <Button>
            <Trash2 className="text-red-500" />
          </Button>
          <Button>Add Dishes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
