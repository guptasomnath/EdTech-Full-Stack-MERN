import { Schema, model } from "mongoose";

const categorysSchema = new Schema({
    categoryName: { type: String, require: true }
});

export const CategorysModel = model("Categorys", categorysSchema);