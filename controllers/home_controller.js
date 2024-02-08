const Post = require("../models/post")

module.exports.home = async function(req, res){
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
        });
        return res.render('home', {
            title: 'homepage',
            posts: posts
        });
    }catch(err){
        console.log(`Error in fetching posts --> ${err}`);
    }

}