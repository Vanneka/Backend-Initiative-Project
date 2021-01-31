const express = require('express');
const router = express.Router();
let movieTempStore = []
let id = 0

router.get('/', (req, res) => {
    try {
        if (movieTempStore.length < 1) {
            res.json({ message: "Oops, your data storage is empty" })
        }
        res.json(movieTempStore)
    } catch (error) {
        res.json({ error: `An error ${error} has occured` })
    }
})


router.get('/:id', (req, res) => {
    const movie = movieTempStore.find(val=> val.id === Number(req.params.id))
    if(!movie){
        res.json({message: 'Movie not found'})
    }
    res.json(movie)
})


router.post('/', (req, res) => {
    const newMovie = {
        title: req.body.title,
        year: req.body.year,
        description: req.body.description,
        id: id++
    }
    try {
        movieTempStore.push(newMovie)
        res.redirect('/movies')
    } catch (error) {
        res.json({ error: `An error ${error} has occured` })
    }
})


router.patch('/:id', (req, res) => {
    const movie = movieTempStore.find(val=> val.id === Number(req.params.id))

    movie.title = req.body.title
    movie.year = req.body.year
    movie.description = req.body.description

    res.redirect('/movies')
})


router.delete('/:id', (req, res) => {
    const movieIndex = movieTempStore.findIndex(val=> val.id === Number(req.params.id))
    movieTempStore.splice(movieIndex, 1)
    res.redirect('/movies')
})
module.exports = router

/* TASKS
{
    "title": "Gone with the wind",
    "year": 2001,
    "description": "A love story"
}
{
    "title": "Inglorious Bastards",
    "year": 2091,
    "description": "A film about a man that became a goat"
}
{
    "title": "Her Fathers house",
    "year": 2031,
    "description": "She left to be a better woman"
}
*/