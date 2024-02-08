const Post = require("../models/post")

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

