const mongoose = require('../conn')

const s1 = mongoose.Schema({
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
    downloadPath:{
        type:String,
        required:true
    },
    viewPath:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})

const Movies = mongoose.model('movies',s1)

module.exports = Movies;