const mongoose = require('../conn')

const s4 = mongoose.Schema({
    of:{
        type:String,
        required:true
    },
    season:{
        type:String,
        required:true
    },
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
    downloadUrl:{
        type:String,
        required:true
    },
    watchUrl:{
        type:String,
        required:true
    }
})

const Admins = mongoose.model('episodes',s4)

module.exports = Admins;