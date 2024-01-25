const express = require('express'); // importing express
const {signup} = require('../controller/signupController'); //importing functions from signup controller
const { login } = require('../controller/loginController');
const router = express.Router(); // creating an instance of express router

// route for signup
router.route('/signup').post(signup)
//  route for login
router.route('/login').post(login)

// exporting the router to be used in other parts 
module.exports = router