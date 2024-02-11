const Shows = require('../model/showModel');
const Seats = require('../model/seatModel');
const Movies = require('../model/movieModel');
const fs = require('fs')

const addShow = async(req, res) => {
    const {show_time, show_date, movie_id, number_of_seats} = req.body

    const show = await Shows.create({
        show_time:show_time,
        show_date:show_date,
        movie: movie_id
    })
    // console.log("Show",show)

// function call to create seat array
const seatArray = createSeats(number_of_seats, show._id)
// console.log("Seats created", seatArray)
const seats = await Seats.insertMany(seatArray)
// console.log("Seats inserted", seats)
res.status(200).json(show)
    
}

const createSeats = (input, show) => {
    const rows = Math.ceil(input / 10)

const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"]

const letters = alphabets.slice(0, rows)

const seats = []
let count = 0
for (let i of letters){
    for (let j = 1; j<11 ; j++){
        if(count >= input){
            break
        }
        const seatObj = {
            seat_name: `${i}${j}`,
            show: show,
            status: "vacant"
        }
        seats.push(seatObj)
        count += 1
    }
}
return seats
}


const deleteShow = async(req, res) => {
    
    const {_id} = req.params

    const show = await Shows.findByIdAndDelete(_id)
    console.log("Show got deleted", show)
    res.status(200).json(show)
}

const getMovies = async(req, res) => {
    const movies = await Movies.find()
    res.status(200).json({movies})
}

const addMovie = async(req,res) => {
    const {movie_name, category, language, rating, price} =req.body
    console.log("request body",req.body)
    console.log("request file", req.file)

    try {
        let filepath = ''
        if(req.file ){
            const filenameParts = req.file.originalname.split('.')
            const extension = filenameParts.pop()
            const path = req.file.path
            filepath = path+ '.' +extension
            fs.renameSync(path, filepath)

            const movie = await Movies.create({
                movie_name: movie_name,
                category: category,
                language: language,
                image: filepath,
                rating: rating,
                price: price
            })
            res.status(200).json({Movies: movie})
        }
    } catch (error) {
        console.log("Error", error)
        res.status(400).json("Something went wrong")
    }
    
}
const editMovie = async(req,res) => {
    const {_id} =req.params
    const {movie_name, category, language, image, rating, price} =req.body
    let filepath = ''
        if(req.file ){
            const filenameParts = req.file.originalname.split('.')
            const extension = filenameParts.pop()
            const path = req.file.path
            filepath = path+ '.' +extension
            fs.renameSync(path, filepath)
        }
        const movieObj = {
        movie_name: movie_name,
        category: category,
        language: language,
        rating: rating,
        price: price
        }

        if(filepath.length > 0){
            movieObj.image = filepath
        }

    const updatedMovie = await Movies.findByIdAndUpdate(_id, movieObj, {returnDocument: 'after'})
    // console.log("movie edited")
    res.status(200).json({"Updated movie": updatedMovie})
    
}
const deleteMovie = async(req,res) => {
    const {_id} = req.params
    const deletedMovie = await Movies.findByIdAndDelete(_id)
    // console.log("movie deleted")
    res.status(200).json(deletedMovie)
}

module.exports = {addShow, deleteShow, addMovie, getMovies, editMovie, deleteMovie}
