import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema({
    title: { type : String, text : true },
    thumbnail: String,
    duration: String,
    categoryName: String,
    longDescription: String,
    language: String,
    price: Number,
    createdAt : { type : Date, default : Date.now },
    shortDescription: { type : String, text : true },
    ratings : Number,
    totalRatings : Number,
});

CourseSchema.index({ title : 'text', shortDescription : 'text'});

export const CourseModel = mongoose.model("courses", CourseSchema);