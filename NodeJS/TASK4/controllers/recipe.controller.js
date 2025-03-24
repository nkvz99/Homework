import Recipe from "../models/recipe.model.js.js";
import mongoose from "mongoose";
const RecipeController = {
    async getAllRecipes(req, res) {
        try {
            const recipes = await Recipe.find();
            res.json(recipes);
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    },
    async createRecipe(req, res){
        try{
            const {title, description, ingredients, instructions, cookingTime, difficulty, isVegetarian, category} = req.body
            const recipe = new Recipe({
                title,
                description,
                ingredients,
                instructions,
                cookingTime,
                difficulty,
                isVegetarian,
                category

            });
            const createdRecipe = await recipe.save();
            res.status(201).send(createdRecipe);
        }catch(error){
            res.status(500).send({
                errors: [error.message],
            });
        }
    },
    async deleteRecipeById(req, res) {
        try {
            const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
            if (!deletedRecipe) return res.status(404).json({ error: "Recipe not found" });
    
            res.json({ message: "Recipe deleted successfully", deletedRecipe });
        } catch {
            res.status(400).json({ error: "Invalid ID format" });
        }
    },
    async getReceipeById(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ error: `Invalid ID format: "${id}". Please provide a valid one!` });
            }
            const receipe = await Recipe.findById(id);
    
            if (!receipe) {
                return res.status(404).json({ error: `Recipe with ID "${id}" not found!` });
            }
            res.json(receipe);
        } catch (error) {
            console.error("Server error:", error);
            res.status(500).json({ error: "Internal Server Error. Please try again later." });
        }
    }
    
    
    ,
    async  getRecipesByCategory(req, res) {
        try {
            const recipes = await Recipe.find({ category: req.params.category });
    
            if (!recipes.length) { 
                return res.status(404).json({ error: "No recipes found in this category" });
            }
    
            res.json(recipes);
        } catch (error) {
            console.error("Error fetching recipes:", error);
            res.status(500).json({ error: "Server error" });
        }
    },
    async updateRecipe(req, res) {
        try {
            const { id } = req.params;
            const { body } = req;
    
            const recipe = await Recipe.findByIdAndUpdate(id, body, {
                new: true, 
            });
            if (!recipe) {
                return res.status(404).json({ error: "Recipe not found" });
            }
            res.json(recipe);
        } catch (error) {
            res.status(500).json({ errors: [error.message] });
        }
    }
    

    
    

    
    
    

}

export default RecipeController;