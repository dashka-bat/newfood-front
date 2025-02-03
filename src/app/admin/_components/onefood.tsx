import { foodType } from "@/app/_components/types";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import AddOneFood from "./addOneFOod";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export default function OneFood({
  foodName,
  price,
  image,

  _id,
  ingerdients,
  categoryName,
  setEditRender,
  categoryid,
}: any) {
  const [oneCategory, setCategory] = useState<category[]>([]);
  const [images, setImage] = useState<string>("");
  const [editFoodname, setFoodname] = useState("");
  const [editPrice, setPrice] = useState("");
  const [editIngredients, setIngredients] = useState("");

  const item = {
    foodName,
    price,
    image,
    _id,
    ingerdients,
    categoryName,
    categoryid,
  };
  type category = {
    categoryName: string;
    _id: string;
  };

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
        setImage(dataJson.secure_url); // Шинэ зурагны URL-ийг хадгалах
      }
    } catch (error) {
      console.error("Зураг байршуулалт алдаа:", error);
      alert("Зураг байршуулахад алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  const EditFood = async () => {
    try {
      const food = {
        foodName: editFoodname,
        price: Number(editPrice),
        image: image, // Шинэ зурагны URL
        ingredients: editIngredients,
        category: categoryid, // category зөв дамжуулалт
      };

      const response = await fetch(`http://localhost:3004/food/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(food),
      });

      if (!response.ok) throw new Error("Хоол засахад алдаа гарлаа");

      alert("Хоол амжилттай засагдлаа!");
      setFoodname("");
      setPrice("");
      setIngredients("");
      setImage(""); // Зураг өөрчлөгдсөний дараа image хувийг цэвэрлэх
    } catch (error) {
      console.error("error:", error);
      alert("Хоол засахад алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  const DeleteFood = async () => {
    const response = await fetch(`http://localhost:3004/food/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("error");

    alert("Хоол амжилттай устгагдлаа!");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3004/food-category");
      const data = await response.json();
      setCategory(data);
    };
    fetchData();
  }, []);
  return (
    <div className="bg-white mb-5 border-[1px] rounded-xl h-fit">
      <div className="flex gap-5">
        <Card className="w-[270px] mb-5 relative">
          <img
            className="w-[240px] h-[130px] rounded-xl ml-3 mt-2"
            src={item.image || null}
            alt="food"
          ></img>
          <div className="flex justify-between ml-5 mr-5">
            <div className="text-red-400">{item.foodName}</div>
            <div>${item.price}</div>
          </div>

          <div className="mr-5 ml-5">{item.ingerdients}</div>
          <Dialog>
            <DialogTrigger>
              <div className="bg-white absolute top-20 right-7 w-[40px] h-[40px] flex justify-center items-center rounded-2xl">
                <Pencil className="text-red-500" />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Dish Name
                  </Label>
                  <Input
                    id="name"
                    onChange={(e) => setFoodname(e.target.value)}
                    // value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    category
                  </Label>
                  <div>
                    <Popover>
                      <PopoverTrigger className="w-[288px] h-[36px] border-[1px] rounded-xl">
                        select your category
                      </PopoverTrigger>
                      <PopoverContent>
                        {oneCategory?.map((category) => (
                          <Badge
                            className="grid grid-cols-1 w-fit mt-2"
                            key={category._id}
                          >
                            {category.categoryName}
                          </Badge>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    ingerdients
                  </Label>
                  <Input
                    onChange={(e) => setIngredients(e.target.value)}
                    id="name"
                    // value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Price
                  </Label>
                  <Input
                    onChange={(e) => setPrice(e.target.value)}
                    id="name"
                    // value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  {images && (
                    <img
                      className="w-[240px] h-[200px]"
                      src={images}
                      alt="food"
                    />
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
              <DialogFooter>
                <Button type="submit" onClick={EditFood}>
                  edit{" "}
                </Button>
                <Button
                  className="bg-red-600"
                  type="submit"
                  onClick={DeleteFood}
                >
                  delete{" "}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    </div>
  );
}
