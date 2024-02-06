module.exports.profile = (req, res)=>{
    return res.render('user', {
        title: 'profile'
    });
    
}

module.exports.signUp = (req, res)=>{
    return res.render('sign_up', {
        title: 'signup'
    });
}

module.exports.signIn = (req,res)=>{
    return res.render('sign_in', {
        title: "signin"
    });
}