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

import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


const FormSchema = z.object({
  cooking_steps: z.boolean().default(false).optional(),
  ingredients_num: z.boolean(),
  calorie: z.string().min(1, {
      message: "Calories must be greater than 0.",
}),
  protein: z.string().min(1, {
      message: "Protein must be greater than 0.",
  }),
})

export default function Home() {

  const [file, setFile] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [isData, setisData] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        ingredients_num: false,
    },
  })


  const onFileChange = (event) => {
    const selectedFile =  event.target.files[0]
    setFile(selectedFile);
  };

  function onFileUpload(data) {
    console.log(data)
  
    if (file === null) {
      console.log('Please upload a file')
      setIsAlertOpen(true);
      console.log(isAlertOpen)
    } else {
      const formData = new FormData();
      formData.append("file", file);
  
      // Append form data to formData
      for (const key in data) {
        formData.append(key, data[key]);
      }
  
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

          <div className="flex flex-col items-center h-full space-y-2 w-full">
            <Label htmlFor="picture" className="font-semibold text-white text-2xl">Upload a picture to start!</Label>

            <div className="flex flex-col w-full items-center max-w-sm space-y-2">
              <Input id="picture" type="file" onChange={onFileChange} />
              {/* <Button type="submit" className="bg-white text-black hover:bg-black hover:text-white" onClick={onFileUpload}>Upload</Button> */}
            </div>

            {isData && (
              <div className="flex flex-row flex-wrap justify-center space-x-2 pt-5">
                {ingredients.map((ingredient) => (
                  <IngredientCard ingredient={ingredient} />
                ))}
              </div>
            )}

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

            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onFileUpload)} className="w-min space-y-6 ">
                    <div className="p-4 bg-zinc-900 shadow rounded-lg">
                      {/* <h3 className="mb-4 text-lg font-medium">Email Notifications</h3> */}
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="cooking_steps"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div>
                                {/* <FormLabel className="text-base">
                                  Marketing emails
                                </FormLabel> */}
                                <FormDescription className="text-white font-2xl">
                                  Steps to cook should be greater than 10?
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="ingredients_num"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="">
                                {/* <FormLabel className="text-base">Security emails</FormLabel> */}
                                <FormDescription className="text-white font-2xl">
                                    Ingredients to cook should be greater than 10?
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value}
                                  onCheckedChange={field.onChange}

                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                    <FormField
                      control={form.control}
                      name="calorie"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white ">Max Calorie Count</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="calories" {...field} />
                          </FormControl>
                          <FormDescription className="text-slate-300">
                            What is the maximum number of calories you want in the food?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="protein"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white ">Minimum Protein</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="protein" {...field} />
                          </FormControl>
                          <FormDescription className="text-slate-300">
                            What is the minimum gms of protein you want in the food?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                      </div>
                    </div>
                    <Button type="submit" onSubmit={onFileUpload}className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</Button>
                    
                  </form>
                </Form>

                
          </div>
          // </div>

            
   

     
    // </body>
  );
}



export function IngredientCard({ ingredient }) {
  return (
    <div className="bg-black shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
      <div className="font-bold text-white text-xl">{ingredient}</div>
    </div>
  );
}