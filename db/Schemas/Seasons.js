const mongoose = require('../conn')

const s4 = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    of:{
        type:String,
        required:true
    }
})

const Seasons = mongoose.model('seasons',s4)

module.exports = Seasons;