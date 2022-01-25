const mongoose = require('../conn')

const s3 = mongoose.Schema({
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
    }
})

const Series = mongoose.model('series',s3)

module.exports = Series;