const {
    getUserByUserId,
    getUserByUserEmail,
  } = require("./user.service");
  
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");



module.exports = {
   
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      //results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },

          login: (req, res) => {
            const body = req.body;
            getUserByUserEmail(body.email, (err, results) => {
              if (err) {
                console.log(err);
              }
              if (!results) {
                return res.json({
                  success: 0,
                  data: "Invalid email or password"
                });
              }
              const result = compareSync(body.password, results.password);
              const options = {
                httpOnly:true,
              };
              if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                  expiresIn: process.env.JWT_EXPIRES_IN
                });
                return res
                .cookie('token', jsontoken, options )
                .json({
                  success: 1,
                  message: "Login Successfully 😊",
                  token: jsontoken,
                  expires: process.env.JWT_EXPIRES_IN,
                });
              } else 
              {
                return res.json({
                  success: 0,
                  data: "Invalid email or password"
                });
              }
            });
          }
        }
      
