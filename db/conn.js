const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/movies')
.then(() => {
    console.log('DB initialized')
})
.catch(() => {
    console.error("An error occured in db/conn.js file");
})

module.exports = mongoose;