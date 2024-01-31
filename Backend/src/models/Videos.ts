import mongoose, { Schema, model } from "mongoose";

const VideosSchema = new Schema({
    courseID : mongoose.Types.ObjectId,
    title : String,
    duration : String,
    videoNumber : Number
});

export const VideosModel = model('Videos', VideosSchema);