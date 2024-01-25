const asyncHandler = require('async-handler'); //Importing the 'asyncHandler' middleware for error handling in asynchronous routes
const bcrypt = require('bcrypt'); // importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); //importing jsonwebtoken for token generation
const User = require('../model/userModel'); // importing the User Model

const login = async (req, res, next) => {
    try {
        // Extracting data from the request body
        const { email, password } = req.body;
        // console.log(req.body);
        // fetching user with the particular email from db
        const user = await User.findOne({ email });
        // if user exists 
        if (user) {
            // Matching and comparing password entered and the the passord saved in db
            const matchPassword = bcrypt.compareSync(password, user.password);
            // if passwords doesn't match sending unauthorised response
            if (!matchPassword) {
                res.status(401).send('Invalid credentials');
            } 
            // if passwords match token is generated
            else {
                let payload = { email: email, password: password };
                const token = jwt.sign(payload, 'yourSecretKey');
                res.status(200).json({ message: 'success', token });
            }
        } 
        // sending unauthorised response if user not found in db
        else {
            console.log('User not found');
            res.status(401).send('Invalid credentials');
        }
    }
    // Handle errors and send an appropriate error response
     catch (err) {
        console.error('Error finding user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {login}
