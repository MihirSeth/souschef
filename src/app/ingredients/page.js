"use client"; // This is a client component 

// import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import Link from 'next/link';


export default function Page() {

  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [total_objects, setTotalObjects] = useState(0);
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [minutes, setMinutes] = useState('');

    useEffect(() => {
        const storedData = localStorage.getItem("data");
        const info = localStorage.getItem("info");

        if (info) {
          const parsedInfo = JSON.parse(info);
          setCalories(parsedInfo.calorie)
          setProtein(parsedInfo.protein)
          setMinutes(parsedInfo.minutes)

        }

        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log(parsedData.objects)
          setIngredients(parsedData.objects)
          setRecipes(parsedData.recipes);
          setTotalObjects(parsedData.total_objects);
      
        }
      }, []);

      function onReload() {
          let info = [calories, protein, minutes, ingredients]
          console.log(info)
      
        
          const formData = new FormData();
      
          for (const key in info) {
            formData.append(key, info[key]);
          }
    
    
          fetch('http://localhost:8080/api/reload', {
              method: 'POST',
              body: formData,
          })
          .then(response => {
              if (!response.ok) {
                  alert(`HTTP error! status: ${response.status}`)
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              if (!data) {
                  alert('No data returned by API')
                  throw new Error('No data returned by API');
              }
              console.log('Reload successful:', data);

              setIngredients(data.objects)
              setRecipes(data.recipes);
              setTotalObjects(data.total_objects);
          })      
      };

  return (
    <div className="p-4">
            <h1 className="text-xl font-bold text-white">Ingredients</h1>

              <div className="flex flex-row flex-wrap justify-center space-x-2 pt-5">
                {ingredients.map((ingredient) => (
                  <IngredientCard key={ingredient} ingredient={ingredient} />
                ))}`
              </div>

              <h1 className="text-xl font-bold text-white">Total Recipes: {total_objects}</h1>

      <h1 className="text-2xl font-bold mb-4 text-white mt-2">Recipes</h1>

      
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

        <div className="flex flex-col items-center">
              <Button type="submit" onClick={onReload} className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Get more Options</Button>
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