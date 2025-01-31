// "use client";
// import { foodType } from "@/app/_components/types";
// import { useEffect, useState } from "react";
// import OneFood from "./onefood";
// import AddOneFood from "./addOneFOod";
// import EditDish from "./editDish";
// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";

// export default function Body() {
//   const [food, setFood] = useState<foodType[]>([]);
//   const [editRender, setEditRender] = useState(false);

//   const searchParams = useSearchParams();
//   const category = searchParams.get("category");

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(
//         `http://localhost:3004/food?category=${category}`
//       );
//       const data = await res.json();
//       setFood(data);
//     };
//     fetchData();
//   }, [category]);
//   console.log(food);

//   return (
//     <div className="bg-white">
//       <div className="relative">
//         {food?.map((foods) => (
//           <div key={foods._id}>
//             {" "}
//             <div className="text-[40px] ml-5">
//               {foods.category.categoryName}
//             </div>
//             <div className="flex gap-5" key={foods._id}>
//               <Link href={`/admin/menu?category=${foods.category._id}`}>
//                 {" "}
//                 <div className="w-[270px] h-[240px] border-[2px] border-red-500 border-dashed  rounded-xl flex flex-col items-center justify-center ml-5">
//                   <Dialog>
//                     <DialogTrigger asChild>
//                       <div>
//                         add new dish to
//                         <div>{foods.category.categoryName}</div>
//                       </div>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogTitle>Dialog Title</DialogTitle>
//                       <p>This is the content of the dialog.</p>
//                       <AddOneFood categoryid={foods.category._id} />
//                     </DialogContent>
//                   </Dialog>
//                 </div>
//               </Link>
//               <div>
//                 <OneFood
//                   setEditRender={setEditRender}
//                   ingerdients={foods.ingerdients}
//                   _id={foods._id}
//                   categoryName={foods?.category?.categoryName}
//                   category={foods?.category}
//                   foodName={foods?.foodName}
//                   price={foods?.price}
//                   image={foods?.image || null}
//                   categoryid={foods?.category?._id || null}
//                 />
//                 {/* <h1>{food.category}</h1> */}{" "}
//                 <div className="absolute top-[-60px] left-[400px]">
//                   {editRender && <EditDish food={food} />}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import OneFood from "./onefood";
import AddOneFood from "./addOneFOod";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { foodType } from "@/app/_components/types";
import EditDish from "./editDish";

export default function Body() {
  const [food, setFood] = useState<{ [key: string]: foodType[] }>({});
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3004/food?category=${category}`
        );
        if (!res.ok) {
          throw new Error("Өгөгдлийг татаж чадсангүй");
        }
        const data = await res.json();

        // Ангиллаар бүлэглэх
        const groupedData = data.reduce((acc: any, dish: foodType) => {
          const catId = dish.category._id;
          if (!acc[catId]) acc[catId] = [];
          acc[catId].push(dish);
          return acc;
        }, {});

        setFood(groupedData);
      } catch (error) {
        console.error("Алдаа гарлаа:", error);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="bg-white">
      {Object.keys(food).map((catId) => (
        <div key={catId}>
          {/* Ангиллын нэр */}
          <div className="text-[40px] ml-5">
            {food[catId][0]?.category?.categoryName}
          </div>
          <div className="flex gap-5">
            {/* Шинэ хоол нэмэх хэсэг */}
            <div className="w-[270px] h-[240px] border-[2px] border-red-500 border-dashed rounded-xl flex flex-col items-center justify-center ml-5">
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    Шинэ хоол нэмэх
                    <div>{food[catId][0]?.category?.categoryName}</div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Шинэ хоол нэмэх</DialogTitle>
                  <AddOneFood categoryid={catId} />
                </DialogContent>
              </Dialog>
            </div>
            {/* Хоолнуудыг харуулах */}
            {food[catId].map((dish) => (
              <OneFood
                id={dish._id}
                food={food}
                key={dish._id}
                setEditRender={() => {}}
                {...dish}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
