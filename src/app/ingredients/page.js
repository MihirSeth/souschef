"use client"; // This is a client component 

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import axios from "axios";
import { Button } from "@/components/ui/button"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Page() {

  const router = useRouter();
  useEffect(() => {
    console.log(router.query.data);
  }, []);
  // const { data } = router.query;

 return (
  <div>
    <h1>Hello</h1>
    {router.query.data && router.query.data.map((ingredient) => (
      <h1 className="text-white">{ingredient}</h1>
    ))}
  </div>
);
}
