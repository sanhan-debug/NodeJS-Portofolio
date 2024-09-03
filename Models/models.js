import { model, Schema } from "mongoose";


const userSchema = new Schema({
    username: String,
    surname: String,
    email: String,
    password: String,
    job: String,
    description: String,
    photo: String,
}, {
    versionKey: false,
    timestamps: true
})

const projectSchema = new Schema({
    projectname: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    description: String,
    photo: String,
}, {
    versionKey: false,
    timestamps: true
})


export const userModel = model("users", userSchema)
export const projectModel = model("projects", projectSchema)