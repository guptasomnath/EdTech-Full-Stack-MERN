import mongoose, { Schema } from "mongoose";

const FilterSchema = new Schema({
    filterName : {
        type : String,
        require : true
    },
    filterOptionList : {
        type : [{optionName : String, optionQueryCode : Object || String}],
        require : true
    }
});

export const FilterModule = mongoose.model("Filters", FilterSchema);