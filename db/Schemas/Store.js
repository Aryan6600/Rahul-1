const mongoose = require('../conn')

const s6 = mongoose.Schema({
    title:{
        type:String,
        required:true,
        index:true,
    },
    type:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    downloadUrl:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
})

s6.index({title:"text"})

const Store = mongoose.model('store',s6)

module.exports = Store;