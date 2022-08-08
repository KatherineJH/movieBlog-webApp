const express = require('express');
const router = express.Router();
const{ User } = require("../models/User");
// user authentication
const{ auth } = require('../middleware/auth')

// < ------------- Routes for Users ----------------> //
// register Route for Register/sign-up
router.post('/register', (req, res) => { // '/register' -> end point: registr
    // get the information needed from the client-side >> put them in the DB.
    const user = new User(req.body);
  
    // mongoDB method
    // encoding before saving > User.js
    user.save((err, userInfo) => { // call back function
      if(err) return res.json({success: false, err})
      return res.status(200).json({ // res.status(200) -> success
        success: true
      })
    }) 
  })
  
  // login route 
  router.post('/login', (req, res) => {
    // 1. find requested email in DB -> User.findOne()
    User.findOne({ email: req.body.email }, (err, user) => {
      if(!user){
        return res.json({
          loginSuccess: false,
          message: "No user for the requested email address!"
        })
      } else {
        // 2. Check if the requested email has the same password (in DB): check if the plain password and the encrypted(Hashed) password are the same using Bcrypt.
        // Create comparePassword() method
        user.comparePassword(req.body.password, (err, isMatch) => { 
        // console.log('err', err);
        // console.log('isMatch', isMatch);
    
          // get method from User.js model
          if(!isMatch){
            return res.json({ loginSuccess : false, message: "Wrong Password!"})
          } else {
            // 3. password matched ->Token 
            user.generToken((err, user) => {
              if(err) return res.status(400).send(err);
                // save token in Cookie or local storage
                res.cookie("auth_reg", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id })   
            })
          }
        })
      }
      
    }) 
  })
  
  
  router.get('/auth', auth, (req, res) => { // auth(middleware) -> before call back function((req, res) -> if pass -> Authentication true
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : ture,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
    })
  })
  
  // logout route  
  // find a user asked for log-out in BD -> remove a token of the user.
  router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id},
      { token: "" },
      (err, user) => {
        if(err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true
        })
      })
  })

module.exports = router;