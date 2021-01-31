const express = require('express');
const router = express.Router();
let usersTempStore = []
let id = 0

router.get('/', (req, res) => {
    try {
        if (usersTempStore.length < 1) {
            res.json({ message: "Oops, your data storage is empty" })
        }
        res.json(usersTempStore)
    } catch (error) {
        res.json({ error: `An error ${error} has occured` })
    }
})


router.get('/:id', (req, res) => {
    const user = usersTempStore.find(val=> val.id === Number(req.params.id))
    if(!user){
        res.json({message: 'User not found'})
    }
    res.json(user)
})


router.post('/', (req, res) => {
    const newUser = {
        userName: req.body.userName,
        id: id++
    }
    try {
        usersTempStore.push(newUser)
        res.redirect('/rentals')
    } catch (error) {
        res.json({ error: `An error ${error} has occured` })
    }
})


router.patch('/:id', (req, res) => {
    const user = usersTempStore.find(val=> val.id === Number(req.params.id))
    user.userName = req.body.userName
    res.redirect('/users')
})


router.delete('/:id', (req, res) => {
    const userIndex = usersTempStore.findIndex(val=> val.id === Number(req.params.id))
    usersTempStore.splice(userIndex, 1)
    res.redirect('/users')
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