import { z } from "zod";

export const createRecipeSchema = z.object({
    title: z
    .string()
    .min(1, "Title is required")
    .transform((str) =>
      str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    ),
  
  description: z
    .string()
    .min(1, "Description is required and cannot be empty!"),
  ingredients: z
    .array(z.string())
    .min(1, "Ingredient cannot be empty!")
    .transform((arr) => ({
      list: arr,
      formatted: arr.join("\n"),
    })),
    instructions: z
    .array(z.string())
    .min(1, "Instructions are required and cannot be empty!"),  
  cookingTime: z
  .number({
    required_error: "Cooking time is required",
    invalid_type_error: "Cooking time must be a number",
  })
  .min(1, "Cooking time must be at least 1 minute!"),

  difficulty: z.enum(["easy", "medium", "hard"], {
    message: "Difficulty must be 'easy' , 'medium' or 'hard'",
  }),
  isVegetarian: z.boolean({
    required_error: "isVegetarian is required",
    invalid_type_error: "isVegetarian must be true or false",
  }),
  category: z.enum(["breakfast", "lunch", "dinner", "dessert"], {
    message: "Category must be one of: breakfast , lunch , dinner or dessert",
  }),
});

export const updateReceipeSchema = createRecipeSchema.partial();
