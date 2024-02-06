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

module.exports.createSession = (req,res)=>{
    //find user
    User.findOne({email: req.body.email})
    .then((user)=>{
        //handle user found
        if(user){
            //handle mismatching password
            if(user.password != req.body.password){
                console.log("passwords mismatching");
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user.id);
            console.log("logged in");
            return res.redirect('/users/profile');
        }
        //handle user not found
        console.log("not found");
        return res.redirect('/users/sign-up');
    }).catch((err)=>{
        console.log(`Error in finding the user ${err}`);
    })


}
