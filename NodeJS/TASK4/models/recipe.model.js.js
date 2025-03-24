import {Schema, model} from 'mongoose';

const recipeSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    ingredients:{
        type: [String],         // posto e array od stringovi
        required: true,
        min:1,
    },
    instructions:{
        type: [String],         // isto i ovde array od stringovi
        required: true,
        min:1,
    },
    cookingTime:{
        type: Number,
        required: true,
        min:1,  // minimalno da e 1 minuta toa go hendlame podobro vo zod
    },
    difficulty:{
        type: String,
        enum:["easy", "medium", "hard"],
        required: true,   
    },
    isVegetarian:{
        type: Boolean,
        required: true,
    },
    category:{
        type: String,
        enum:["breakfast", "lunch", "dinner","dessert"],
        required: true,
    }
});

const Recipe = model("receips", recipeSchema);

export default Recipe