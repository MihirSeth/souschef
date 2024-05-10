"use client"; // This is a client component 

import Image from "next/image";
import logo from '/Users/mihirseth/Desktop/Coding/souschef/sous-chef/public/vertical-logo.png'
import { useState, useEffect } from "react";
// import axios from "axios";
import { Button } from "@/components/ui/button"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function Home() {

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/home")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // message = 'Loading'
  //       // once data is retrieved
  //       // message = data.message
  //       // setMessage(data.message);
  //       // setPeople(data.people);
  //       console.log(data)
  //     });
  // }, []);

  const [file, setFile] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [isData, setisData] = useState(false);



  const onFileChange = (event) => {
    const selectedFile =  event.target.files[0]
    setFile(selectedFile);
  };

   const onFileUpload = () => {
    // console.log('hello')

    if (file === null) {
      console.log('Please upload a file')
      setIsAlertOpen(true);
      console.log(isAlertOpen)


    } else {
    const formData = new FormData();
    formData.append("file", file);

    fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Image uploaded successfully:', data);
        setisData(true)
        setIngredients(data.objects)
        console.log(data.objects)
    })
    .catch(error => {
        console.error('Error uploading image:', error);
    });
  }
};
  const closeAlert = () => {
    setIsAlertOpen(false);

  };

  return (
    <body>
    <div className="min-h-screen bg-gradient-to-r from-neutral-900 to-emerald-800">
      <header className="flex flex-col items-center pt-5 "> 
        {/* <h1 className="font-semibold text-4xl ">Hello</h1> */}
            <Image
          src={logo}
          alt="Picture of the author"
          width={200} 
          height={200} 
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
        {/* <h1 className="font-semibold text-white text-2xl" >Upload a picture to start?</h1> */}


      </header>
          <div className="flex flex-col items-center h-screen space-y-2 w-full">
            <Label htmlFor="picture" className="font-semibold text-white text-2xl">Upload a picture to start!</Label>

            <div className="flex flex-col w-full items-center max-w-sm space-y-2">
              <Input id="picture" type="file" onChange={onFileChange} />
              <Button type="submit" className="bg-white text-black hover:bg-black hover:text-white" onClick={onFileUpload}>Upload</Button>
            </div>

            {isData && ingredients.map((ingredient) => (
              <h1 className="text-white">{ingredient}</h1>
            ))}

          </div>
          </div>


    {isAlertOpen && (
        <AlertDialog open={isAlertOpen}>
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>No file uploaded</AlertDialogTitle>
              <AlertDialogDescription>
                Please upload a file before continuing.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeAlert}>Continue</AlertDialogCancel>
              {/* <AlertDialogAction>Continue</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

     
    </body>
  );
}
