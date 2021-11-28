require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

//Route 1 - Create User - POST: '/createUser'
router.post('/createUser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('password', "Enter valid password").isLength({ min: 5 }),
    body("email", "Enter valid Email").isEmail()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    
    try {
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secpwd = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpwd
        });
        const data = {
            user: {
                id: user.id
            }
        } 

        const authtoken = jwt.sign(data, process.env.SECRET_KEY);
        success = true;
        res.json({success, authtoken});

    } catch (error) {
        res.status(500).json({success, error: "Internal Server Error"});
    }
})

//Route 2 - Authenticate a user - POST: '/login'
router.post('/login', [
          body("email", "Enter a valid email").isEmail(),
          body("password", "Password cannot be blank").exists(),
        ], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ success, error: "Please try to login with valid credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with valid credentials" })  
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, process.env.SECRET_KEY);
        success = true;
        res.json({ success, authtoken });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success, error: "Internal server error" })
    }
}
)

//Route 3- Fetch user details- POST: '/fetchuserdetails'
router.post('/fetchuserdetails', fetchUser, async (req, res) => {
    let success = false;
    try {
        let user = await User.findById(req.user.id).select('-password');
        success = true;
        res.send({success, user});
    } catch (error) {
        res.status(500).json({success, error: "Internal Server Error"});
    }
})

module.exports = router;