const User = require("../../../models/user")
const jwt = require('jsonwebtoken');

module.exports.createSession = async (req, res)=>{
    try {
        let user = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).json({message: "invalid user or password"});
        }

        return res.status(200).json(
            {
                message: "Sign in successful, here is your token",
                data: {
                    token : jwt.sign(user.toJSON(),'jwt-auth-key', {expiresIn: '10000'} )
                }
            }
        )
    } catch (error) {

        return res.status(500).json(
            {
                message: "Internal Server Error",
                error : error
            }
        )
        
    }
}