"use client"; // This is a client component 

import Image from "next/image";
import logo from '/Users/mihirseth/Desktop/Coding/souschef/sous-chef/public/vertical-logo.png'
import { useState, useEffect } from "react";
// import axios from "axios";
import { Button } from "@/components/ui/button"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

 
// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })

export default function Home() {

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     username: "",
  //   },
  // })
  
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values)
  // }

  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
      setFile(event.target.files[0]);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        // message = 'Loading'
        // once data is retrieved
        // message = data.message
        // setMessage(data.message);
        // setPeople(data.people);
        console.log(data)
      });
  }, []);

  const onFileUpload = () => {
    console.log('hello')
    const formData = new FormData();
    formData.append("file", file);

    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Image uploaded successfully:', data);
    })
    .catch(error => {
        console.error('Error uploading image:', error);
    });
};

// useEffect(() => {
//   fetch("http://localhost:8080/api/home")
//     .then((response) => response.json())
//     .then((data) => {
//       // message = 'Loading'
//       // once data is retrieved
//       // message = data.message
//       setMessage(data.message);
//       setPeople(data.people);
//     });
// }, []);

  return (
    <body>
    <div className="min-h-screen bg-gradient-to-r from-neutral-900 to-emerald-800">
      <header className="flex flex-col justify-center pl-10 pt-5 "> 
        {/* <h1 className="font-semibold text-4xl ">Hello</h1> */}
            <Image
          src={logo}
          alt="Picture of the author"
          width={200} 
          height={200} 
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
        <h1 className="font-semibold text-white text-2xl" >Ready to get started?</h1>


      </header>

      {/* <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload!</button>
        </div> */}
          <Label htmlFor="picture" className="text-white">Upload a picture</Label>

          <div className="flex w-full max-w-sm items-center space-x-2">
           <Input id="picture" type="file" />
          <Button type="submit" className="bg-white text-black" onClick={onFileUpload}>Upload</Button>
          </div>
          

    </div>
    </body>
  );
}
