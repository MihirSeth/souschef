"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

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

export function RecipeForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        ingredients_num: false,
    },
  })

  function onSubmit(data) {
    console.log(data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-min space-y-6 ">
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
          name="protien"
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
        <Button type="submit" onSubmit={onSubmit}className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</Button>
        
      </form>
    </Form>
  )
}


export default RecipeForm;