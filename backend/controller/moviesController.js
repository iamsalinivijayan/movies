const Movies = require('../model/movieModel'); //Importing model of movies

// function to fetch movies from db
const getMovies = async(req,res) => {
    const allMovies = await Movies.find()
    res.status(200).json(allMovies)
}
// function to add movies to db
const addMovies = async(req,res) => {
    
}
// function to fetch a particular movie
const getMovie = async (req, res) => {
  try {
    console.log(req.params)
    const movieId = req.params._id;
    if (!movieId) {
      return res.status(400).json({ message: 'Invalid movieId' });
    }
    console.log('Movie ID:', movieId); // Log the movieId on the server side
    const movie = await Movies.findById(movieId);
    console.log('Movie Details:', movie); // Log the movie details
    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  
// function to edit movie
const editMovie = async(req,res) => {

}
// function to delete movie
const deleteMovie = async(req,res) => {

}

// Exporting the functions 
module.exports = {getMovies, addMovies, getMovie, editMovie, deleteMovie}
