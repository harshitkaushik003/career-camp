const Post = require("../models/post")

module.exports.home = function(req, res){
    Post.find({})
    .populate('user')
    .then((posts)=>{
        return res.render('home', {
            title: 'homepage',
            posts: posts
        });
    }).catch((err)=>console.log(`error in fetching posts --> ${err}`));
}