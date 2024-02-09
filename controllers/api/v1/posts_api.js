const Post = require('../../../models/post');
const Comment = require('../../../models/comments');
module.exports.posts = async (req, res)=>{
    try {

        let post = await Post.find({})

        return res.json(200, {
            message: "a list of posts",
            posts: post
        })

    } catch (error) {
        console.log(`error in creating post --> ${error}`);
        return res.json(500, {
            message: "Internal Server Error"
        })
    }

};

module.exports.deletePost = async(req, res)=>{
    try{
        let deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).send('Post not found');
        }
        await Comment.deleteMany({ post: req.params.id });

        return res.json(200, {
            messages: "Post and related comments deleted",
            postID: deletedPost._id
        })
    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
}