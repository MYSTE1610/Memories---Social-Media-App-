import mongoose from "mongoose";

// creating mongoose schema 
//what is schema? w/ mongodb we can create documents that look different , one can have title & message , and one can have title 
// with mongoose we can provide some uniformity


const postSchema  = mongoose.Schema({  // function which is having an object   // we are specifying that each post will have to have the following things 
    title: String,
    message: String,
    creator: String,
    tags: [String],  //array of strings 
    selectedFile :String,   // converting image into string using base64
    likeCount: {
        type:Number,
        default:0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },

});

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;