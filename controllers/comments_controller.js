const Comment = require("../models/comments")
const Post = require("../models/post")

module.exports.createComments = (req, res)=>{
    Post.findById(req.body.post)
    .then((post)=>{
        Comment.create(
            {
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }
        ).then((comment)=>{
            post.comments.push(comment);
            post.save();
        })
    })

    return res.redirect('/');
}

module.exports.destroyComment = (req, res)=>{
    Comment.findByIdAndDelete(req.params.id)
    .then((deletedComment)=>{
        return res.redirect('/');
    })
}

