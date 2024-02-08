module.exports.index = (req, res)=>{
    return res.json(200, {
        post: [],
        message: "a list of posts"
    })
};