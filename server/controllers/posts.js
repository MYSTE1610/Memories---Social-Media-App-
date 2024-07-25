import express from 'express';
import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';

const router = express.Router();


// Here we are going to create all the handlers for our routes 
export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();  // making the function asynchronous by using await
        
        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message : error.message});
    }

}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req,res) => {

    const post = req.body;    // we can't console log this rn , since we dont have a way of sending post requsests currently
   // need to implement a form in the front end to be able to get this           

    const newPost    = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);  // 201 ==> successful creation 
        
    } catch (error) {
        res.status(409).json({message : error.message}); // unsuccessful creation 
    }

}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully." });
}


export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}
