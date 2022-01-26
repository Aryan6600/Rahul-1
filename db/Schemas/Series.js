const mongoose = require('../conn')

const s3 = mongoose.Schema({
    title:{
        type:String,
        required:true,
        index:true
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

s3.index({title:"text"})

const Series = mongoose.model('series',s3)

module.exports = Series;