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
        let post = await Post.findById(req.params.id);
        if(post){
            if(post.user == req.user.id){
                await Post.deleteOne({_id : req.params.id});
                await Comment.deleteMany({post: req.params.id});
                return res.status(200).json({
                    messages: "Post and related comments deleted",
                    postID: post._id
                });
            }else{
                return res.status(401).send({message: "Unauthorized"});
            }
        }else{
            return res.status(500).json({message: "Post not found, check id"});
        }

    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
}