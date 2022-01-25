const mongoose = require('../../db/conn')

const s2 = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
})

const Admins = mongoose.model('admins',s2)

module.exports = Admins;