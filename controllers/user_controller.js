const User = require('../models/user');
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

module.exports.create = (req, res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email})
    .then((user)=>{
        if(!user){
            User.create(req.body)
            .then(()=>{
                console.log("user created");
                return res.redirect('/users/sign-in')
            })
            .catch((err)=>{console.log(`Error in creating user --> ${err}`)});
        }
        console.log("user already exists");
        return res.redirect('/users/sign-in');
    }).catch((err)=>{
        console.log(`Error in finding user --> ${err}`);
    })
}


module.exports.signIn = (req,res)=>{
    return res.render('sign_in', {
        title: "signin"
    });
}
