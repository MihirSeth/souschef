"use client"; // This is a client component 

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import Link from 'next/link';


export default function Page() {

  const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("data");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setRecipes(parsedData.recipes);
      
        }
      }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Recipes</h1>
      {recipes.map((recipe, index) => {
        let ingredients = recipe.ingredients.replace(/[\[\]']+/g,'').split(', ');
        let steps = recipe.steps.replace(/[\[\]']+/g,'').split(', ');
        return (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
            <p><strong>Ingredients:</strong> {ingredients.join(', ')}</p>
            <p><strong>Steps:</strong> {steps.join(', ')}</p>
            <p><strong>Nutrition:</strong> {recipe.nutrition.join(', ')}</p>
          </div>
        );
      })}
      <Link href="/">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
}