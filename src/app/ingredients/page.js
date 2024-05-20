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

          let objects = recipe.objects
          // {objects.map((ingredient, i) => <IngredientCard key={i} ingredient={ingredient} />)}

        let ingredients = recipe.ingredients.replace(/[\[\]']+/g,'').split(', ');
        let steps = recipe.steps.replace(/[\[\]']+/g,'').split(', ');
        return (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
            {objects && objects.map((ingredient, i) => <IngredientCard key={i} ingredient={ingredient} />)}
            <p><strong>Ingredients:</strong> {ingredients.join(', ')}</p>
            <p><strong>Steps:</strong> {steps.join(', ')}</p>
            <p><strong>Nutrition:</strong> {recipe.nutrition.join(', ')}</p>
          </div>
        );
      })}
      {/* <Link href="/">
        <Button>Go Back</Button>
      </Link> */}


      <div className="flex flex-col items-center">
            <Link href="/">

                      <Button type="submit" className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Go Back</Button>
             </Link>
        </div>


    </div>
  );
}


export function IngredientCard({ ingredient }) {
  return (
    <div className="bg-black shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
      <div className="font-bold text-white text-xl">{ingredient}</div>
    </div>
  );
}