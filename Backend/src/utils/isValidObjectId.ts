import mongoose from "mongoose";

export const isValidObjectId = (ids : string[]) => {

   let errmsg : string;

   ids.forEach((id) => {
     if(!mongoose.isValidObjectId(id)){
       errmsg = `This is not a valid object id '${id}'`;
       return errmsg;
     }
   })

   return errmsg;
}