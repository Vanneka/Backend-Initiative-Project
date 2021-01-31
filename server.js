require('dotenv').config()
const PORT = process.env.PORT || 3030;
const express = require('express');
const app = express();

// all routes
const usersRoute = require('./routes/route.users')
const moviesRoute = require('./routes/route.movies')
const rentalsRoute = require('./routes/route.rentals')
// all routes

// middleware here
app.use(express.json())
app.use('/users', usersRoute)
app.use('/movies', moviesRoute)
app.use('/rentals', rentalsRoute)

// middleware here

// listen here
app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`)
})
// listen here