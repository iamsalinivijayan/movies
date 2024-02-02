const Movies = require('../model/movieModel'); //importing model of movies

// display function to fetch movies from database for displaying movies on dashboard
const display = async(req, res) => {
    // fetching movies from db and sending the response as json
    const movies = await Movies.find()
    res.status(200).json(movies)
}
// exporting the display function
module.exports = {display}