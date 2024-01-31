import mongoose, { Schema, Document, UpdateQuery } from "mongoose";

const RatingsSchema = new Schema({
    courseID : mongoose.Types.ObjectId,
    userID : mongoose.Types.ObjectId,
    userName : String,
    createdAt : {type : Date, default : Date.now},
    updatedAt : {type : Date, default : Date.now},
    stars : Number,
    message : String,
});

RatingsSchema.pre<UpdateQuery<Document>>('updateOne', async function (next) {
   const update = this.getUpdate() as UpdateQuery<Document>;
   update.updatedAt = Date.now();
   next();
})


export const RatingsModule = mongoose.model('Ratings', RatingsSchema);