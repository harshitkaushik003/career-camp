const Post = require("../models/post")
const Comment = require('../models/comments');
module.exports.createPost = (req, res)=>{
    Post.create(
        {
            content: req.body.content,
            user: req.user._id
        }
    ).then(()=>{
        return res.redirect('/');
    }).catch((err)=>console.log(`error in creating post --> ${err}`));
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