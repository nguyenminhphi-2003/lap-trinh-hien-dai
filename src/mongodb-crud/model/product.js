import mongoose, { version } from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    price:{
        type:Number,
    },
},
{ timestamps: true, versionKey: false});

export default mongoose.model('product',productSchema);