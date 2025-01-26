"use client";
import Category from "../_components/Category";
import { useState } from "react";
import { AddCategory } from "../_components/addCategory";
import { Button } from "@/components/ui/button";
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
import AddOneFood from "../_components/addOneFOod";
import Body from "../_components/body";
export default function Menu() {
  const [modal, setModalOpen] = useState(false);

  return (
    <div>
      <Category setModalOpen={setModalOpen} />
      <div>
        {/* <button
          className="bg-red-500 rounded-full w-[36px] h-[36px] ml-3"
          onClick={() => setModal(true)}
        >
          +
        </button> */}
        <Body />
        <AddOneFood />
      </div>
    </div>
  );
}
