import { Router } from "express";
import RecipeController from "../controllers/recipe.controller.js";
import validateRequest from "../middlewares/validate-request.middleware.js";
import { createRecipeSchema, updateReceipeSchema } from "../schemas/recipe.schemas.js";



const router = Router();

router.get("" , RecipeController.getAllRecipes)
router.post("",validateRequest(createRecipeSchema),RecipeController.createRecipe)
router.delete("/:id", RecipeController.deleteRecipeById)
router.get("/:id", RecipeController.getReceipeById);
router.get("/category/:category", RecipeController.getRecipesByCategory)
router.put("/:id",validateRequest(updateReceipeSchema),RecipeController.updateRecipe);
export default router;