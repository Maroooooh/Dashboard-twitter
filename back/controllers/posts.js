const postsModel = require('../models/posts');


//posts (ahmed hesham)
const getAllPosts = async (req, res) => {
    try {
        let posts = await postsModel.find()
            .populate('userId')
            .populate('replies', 'text created')
            .populate('replies.postedBy', '_id name')
            .populate('likes.userId');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// const addPost = async (req, res) => {
//     const post = req.body;
//     post.userId = req.id; // It knows the id from the last middleware; no need to add userId to create a Post by a specific user

//     try {
//         // Create a new post
//         const newPost = new postsModel({
//             title: post.title,
//             userId: post.userId,
//             replies: post.replies || [], 
//         });

//         // Save the new post 
//         await newPost.save();

//         res.status(201).json({ message: "Added successfully", data: newPost });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// }


const addPost = async (req, res) => {
    const post = req.body;
    post.userId = req.id; // It knows the id from the last middleware; no need to add userId to create a Post by a specific user

    try {
        // Create a new post
        const newPost = new postsModel({
            title: post.title,
            userId: post.userId,
            userProfilePicture: post.userProfilePicture,
            replies: post.replies || [],
        });

        // Save the new post
        await newPost.save();

        res.status(201).json({ message: "Added successfully", data: newPost });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const getOnePost = async (req, res) => {
    let postId = req.params.id;
    try {
        let wanted = await postsModel.findById(postId);
        if (wanted) res.status(200).json(wanted);
        else res.status(404).json({ message: "Not exist" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updatePost = async (req, res) => {
    let postId = req.params.id;
    let newTitleObj = req.body.title;
    try {
        const queryRes = await postsModel.findByIdAndUpdate(postId, { title: newTitleObj });
        console.log(queryRes);
        res.status(200).json({ message: "Edited successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deletePost = async (req, res) => {
    let postId = req.params.id;
    try {
        await postsModel.findByIdAndDelete(postId);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


//replies (essam)
const addReply = async (req, res) => {
    const { postId, userId, text } = req.body;

    try {
        // Create a new reply object
        const reply = {
            text,
            created: new Date(),
            postedBy: userId,
        };

        const updatedPost = await postsModel.findByIdAndUpdate(
            postId,
            { $push: { replies: reply } },
            { new: true }
        )
        .populate('replies.postedBy', '_id name')
        .populate('userId', '_id name');

        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const editReply = async (req, res) => {
    const { postId, replyId, text } = req.body;

    try {
        const updatedPost = await postsModel.findOneAndUpdate(
            { _id: postId, "replies._id": replyId }, // Find the post and the specific reply
            { $set: { "replies.$.text": text } }, // Update the text of the specified reply
            { new: true }
        )
        .populate('replies.postedBy', '_id name')
        .populate('userId', '_id name');

        if (!updatedPost) {
            return res.status(404).json({ message: "Post or reply not found" });
        }

        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const removeReply = async (req, res) => {
    const { postId, replyId } = req.body;

    try {
        // Find the post by ID and remove the specified reply by its _id
        const updatedPost = await postsModel.findByIdAndUpdate(
            postId,
            { $pull: { replies: { _id: replyId } } },
            { new: true }
        )
        .populate('replies.postedBy', '_id name')
        .populate('userId', '_id name');

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}



const toggleLike = async (req, res) => {
    const { postId } = req.body;
    const userId = req.id;

    try {
        const post = await postsModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isLiked = post.likes.some(like => like.userId.equals(userId));

        if (isLiked) {
            // Remove like
            post.likes = post.likes.filter(like => !like.userId.equals(userId));
        } else {
            // Add like
            post.likes.push({ userId });
        }

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}




  
  module.exports = { getAllPosts, addPost, getOnePost, updatePost, deletePost, addReply, editReply, removeReply,toggleLike};
  



  
  






