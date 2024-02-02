const express = require('express'); // importing express
const {display} = require('../controller/dashboardController'); //importing functions from dashboard controller
const {getMovies, addMovies, getMovie, editMovie, deleteMovie} = require('../controller/moviesController'); //importing functions from movies controller
const authentication = require('../middleware/authentication')
const router = express.Router(); // creating an instance of express router

// route for dashboard
router.route('/dashboard').get(display)
// route for movies page
router.route('/movies').get(getMovies).post(addMovies)
router.route('/movies/:_id').get(getMovie).put(editMovie).delete(deleteMovie)


// exporting the router to be used in other parts 
module.exports = router