const express = require('express');
const router = express.Router();
let rentalsTempStore = []
let id = 0

router.get('/', (req, res) => {
    try {
        if (rentalsTempStore.length < 1) {
            res.json({ message: "Oops, your data storage is empty" })
        }
        res.json(rentalsTempStore)
    } catch (error) {
        res.json({ error: `An error ${error} has occured` })
    }
})


router.get('/:id', (req, res) => {
    const rental = rentalsTempStore.find(val=> val.id === Number(req.params.id))
    if(!rental){
        res.json({message: 'Rental not found'})
    }
    res.json(rental)
})


router.post('/', (req, res) => {
    const newRental = {
        title: req.body.title,
        year: req.body.year,
        description: req.body.description,
        id: id++
    }
    try {
        rentalsTempStore.push(newRental)
        res.redirect('/rentals')
    } catch (error) {
        res.json({ error: `An error ${error} has occured` })
    }
})


router.patch('/:id', (req, res) => {
    const rental = rentalsTempStore.find(val=> val.id === Number(req.params.id))

    rental.title = req.body.title
    rental.year = req.body.year
    rental.description = req.body.description

    res.redirect('/rentals')
})


router.delete('/:id', (req, res) => {
    const rentalIndex = rentalsTempStore.findIndex(val=> val.id === Number(req.params.id))
    rentalsTempStore.splice(rentalIndex, 1)
    res.redirect('/rentals')
})
module.exports = router

/*
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