//const jsonwebtoken = require("jsonwebtoken");

//const req = require("express/lib/request");
const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token){
            //Remove Bearer from String
            token = token.slice(7);
            verify(token,process.env.JWT_KEY,(err, decoded) =>{
                if (err){
                    res.json({
                        success:0,
                        message:"Invalid token"
                    });
                }
                else{
                    req.decoded=decoded;
                    next();
                }
            });
        }
        else{
            res.json({
                success:0,
                message:"Access denied! unautorized user"
            });
        }
    }
};
