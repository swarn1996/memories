import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost =  async(req,res)=>{
    try{
     const postMessages = await PostMessage.find();
     res.status(200).json(postMessages)
    }
    catch(error){
     res.status(404).json({message:error.message})
    }
}
export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;
    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
          const postCreated =  await newPostMessage.save();
        res.status(201).json(postCreated );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const updatePost = async(req,res) =>{
    const {id: _id} = req.params;
    const {creator, title, message, tags, selectedFile} = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    const updatedPost = { creator, title, message, tags, selectedFile , _id: _id};
    try{
      const updatePostObject =   await PostMessage.findByIdAndUpdate(_id,updatedPost,{new:true});
    res.json(updatePostObject)
    }
    catch(err){
      res.json(err)
    }
}
export const deletePost = async(req,res) =>{
    const {id: _id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);
    try{
        await PostMessage.findByIdAndRemove(_id);
        res.status(200).json(_id)
    }
    catch(err){
        res.send(err)
    }
}
export const updateLike = async(req,res) =>{
    const {id: _id} = req.params;
    const post = await PostMessage.findById(_id)
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);
    try{
         await PostMessage.findByIdAndUpdate(_id, {likeCount:post.likeCount + 1} )
        res.status(200).json(_id)
    }
    catch(err){
        res.send(err)
    }
}