// "use client";
// import { useState, useEffect } from "react";
// import { CategoryType } from "./_components/types";
// import { Header } from "./_components/header";
// import { Footer } from "./_components/footer";
// import { Badge } from "@/components/ui/badge";
// import { foodType } from "./_components/types";
// import { useSearchParams } from "next/navigation";
// import Body from "./admin/_components/body";
// import Category from "./admin/_components/Category";
// import { Card } from "@/components/ui/card";
// import { useAuthFetch } from "./_components/useFetchData";
// export default function Home() {
//   const [categories, setCategory] = useState<CategoryType[]>([]);
//   const [oneFood, setOneFood] = useState<foodType[]>([]);
//   const searchParams = useSearchParams();
//   const category = searchParams.get("category");
//   const data: any = useAuthFetch(`food-category`);
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(`http://localhost:3004/food-category`);
//       const data = await res.json();
//       setCategory(data);
//     };
//     fetchData();
//   }, []);
//   // const food: any = useAuthFetch(`food?category=${category}`);
//   useEffect(() => {
//     const fetchData = async () => {
//       const endpoint = category ? `food?category=${category}` : "food";

//       const res = await fetch(`http://localhost:3004/${endpoint}`);
//       const data = await res.json();
//       setOneFood(data);
//     };
//     fetchData();
//   }, [category]);
//   console.log(oneFood);

//   return (
//     <div>
//       <Header />
//       <div>
//         <img
//           className="w-screen"
//           src="https://res.cloudinary.com/dxkgrtted/image/upload/v1737306582/Image_e4pmho.png"
//         ></img>
//       </div>
//       <div className="flex justify-center gap-5 bg-gray-500 p-5">
//         <Badge>all dishes</Badge>
//         {data?.map((foodcategory: any) => (
//           <Badge
//             className=" hover:bg-white hover:text-black"
//             key={foodcategory._id}
//           >
//             {foodcategory.categoryName}
//           </Badge>
//         ))}
//       </div>
//       <div>
//         {oneFood?.map((food) => (
//           <div className="bg-gray-500" key={food._id}>
//             <div className="">{food.category.categoryName}</div>
//             <div className="rounded-xl h-fit">
//               <div className="flex gap-5">
//                 <Card className="w-[270px] mb-5 relative">
//                   <img
//                     className="w-[240px] h-[130px] rounded-xl ml-3 mt-2"
//                     src={food.image || null}
//                     alt="food"
//                   ></img>
//                   <div className="flex justify-between ml-5 mr-5">
//                     <div className="text-red-400">{food.foodName}</div>
//                     <div>${food.price}</div>
//                   </div>

//                   <div className="mr-5 ml-5">{food.ingerdients}</div>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Footer />
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { CategoryType } from "./_components/types";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { Badge } from "@/components/ui/badge";
import { foodType } from "./_components/types";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useAuthFetch } from "./_components/useFetchData";

export default function Home() {
  const [categories, setCategory] = useState<CategoryType[]>([]);
  const [oneFood, setOneFood] = useState<foodType[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  // const data: any = useAuthFetch(`food-category`);

  // Fetch categories on mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3004/food-category`);
      const data = await res.json();
      setCategory(data);
    };
    fetchData();
  }, []);

  // Fetch foods based on category (if any)
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = category ? `food?category=${category}` : "food";
      const res = await fetch(`http://localhost:3004/${endpoint}`);
      const data = await res.json();
      setOneFood(data);
    };
    fetchData();
  }, [category]);

  return (
    <div>
      <Header />
      <div>
        <img
          className="w-screen"
          src="https://res.cloudinary.com/dxkgrtted/image/upload/v1737306582/Image_e4pmho.png"
          alt="Header"
        />
      </div>

      {/* Category Badges */}
      <div className="flex justify-center gap-5 bg-gray-500 p-5">
        <Badge
          onClick={() => {
            window.location.href = "/";
          }}
        >
          All Dishes
        </Badge>
        {categories?.map((foodcategory: any) => (
          <Badge
            className="hover:bg-white hover:text-black"
            key={foodcategory._id}
            onClick={() => {
              window.location.href = `/?category=${foodcategory._id}`;
            }}
          >
            {foodcategory.categoryName}
          </Badge>
        ))}
      </div>

      {/* Display foods based on selected category */}
      <div>
        {oneFood?.map((food) => (
          <div className="bg-gray-500" key={food._id}>
            <div className="text-lg font-semibold">
              {food.category.categoryName}
            </div>
            <div className="rounded-xl h-fit">
              <div className="flex gap-5">
                <Card className="w-[270px] mb-5 relative">
                  <img
                    className="w-[240px] h-[130px] rounded-xl ml-3 mt-2"
                    src={food.image || ""}
                    alt="food"
                  />
                  <div className="flex justify-between ml-5 mr-5 mt-2">
                    <div className="text-red-400">{food.foodName}</div>
                    <div>${food.price}</div>
                  </div>
                  <div className="mr-5 ml-5">{food.ingerdients}</div>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
