const Post = require("../models/post")
const Comment = require('../models/comments');
const User = require('../models/user');
module.exports.createPost = async (req, res) =>{
    try {
        let post = await Post.create(
            {
                content: req.body.content,
                user: req.user._id
            }
        )
        let user = await User.findById(post.user._id);
        if(req.xhr){
            return res.status(200).json({
                data: {post: post, user: user},
                message: "Post created"
            })
        }
        return res.redirect('/');
    } catch (error) {
        console.log(`error in creating post --> ${error}`)
    }
};

module.exports.destroyPost = (req, res)=>{
    Post.findByIdAndDelete(req.params.id)
    .then((deletedPost) => {
        if (!deletedPost) {
            return res.status(404).send('Post not found');
        }
        return Comment.deleteMany({ post: req.params.id });
    })
    .then(() => res.redirect('/'))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });

}