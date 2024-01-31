import mongoose, { Schema, Document, UpdateQuery, ObjectId } from "mongoose";
import bcryptjs from "bcryptjs";

// Define the interface for the document
interface CustomDocument extends Document {
    name : string,
    email: string,
    comparePassword: Function,
    enrolledCourses : [{ type : mongoose.Types.ObjectId }]
    isVerified : boolean
}

const UsersSchema = new Schema({
    name: {
        type: String,
        require: [true, "name is required"]
    },
    email: {
        type: String,
        require: [true, "email is required"],
        index : {
            unique: true,
            sparse : true
        }
    },

    password: {
        type: String,
        require: [true, "password is required"]
    },

    isVerified: {
        type: Boolean,
        require: [true, "isVerified is required"],
        default : false
    },

    enrolledCourses : [{ type : mongoose.Types.ObjectId }]
    
});

//compare password
UsersSchema.methods.comparePassword = async function (password: string) {
    return await bcryptjs.compare(password, this.password);
};

//befor save password encrypt it
UsersSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcryptjs.hash(this.password, 10);
});

// Hash the password before saving it to the database
UsersSchema.pre<UpdateQuery<Document>>('updateOne', async function (next) {
    const update = this.getUpdate() as UpdateQuery<Document>;
    if (update.password) {
      update.password = await bcryptjs.hash(update.password, 10);
    }
    next();
});

export const UserModel = mongoose.model<CustomDocument>('Users', UsersSchema);