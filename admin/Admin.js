const Router = require('express').Router()
const BcryptJS = require('bcryptjs')
const Admins = require('./Schemas/Admins')
const multer = require('multer')
const Movies = require('../db/Schemas/Movies')
const Series = require('../db/Schemas/Series')
const Seasons = require('../db/Schemas/Seasons')
const Episodes = require('../db/Schemas/Episodes')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './dist/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    fileFilter:function(req,file,cb){
        if(req.session.admin){
            cb(null,true)
        }else{
            cb(null,true)
        }
    }
})

const upload = multer({ storage: storage })

Router.get('/', (req, res) => {
    if (req.session.admin) {
        return res.redirect('/movie-admin/dashboard')
    }
    res.render('admin-login')
})

Router.post('/', async (req, res) => {
    try {
        const user = await Admins.findOne({ email: req.body.email })
        if (!user) return res.render('admin-login')
        const compare = await BcryptJS.compare(req.body.pass, user.pass)
        if (!compare) return res.render('admin-login')
        req.session.admin = true
        req.session.name = user.name
        res.redirect('/movie-admin/dashboard')
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

Router.get('/dashboard', (req, res) => {
    if(!req.session.admin) return res.redirect('/')
    res.render('admin-dash')
})

Router.post('/img',upload.single('file'),(req,res) => {
    res.redirect('/movie-admin')
})

Router.post('/movie',async(req,res) => {
    const {title,desc,thumb,downldurl,viewurl,type} = req.body
    const add = await Movies.insertMany([{
        title,
        description:desc,
        thumbnail:thumb,
        downloadPath:downldurl,
        viewPath:viewurl,
        type
    }])
    res.redirect('/movie-admin')
})

Router.post('/series',async(req,res) => {
    const {title,desc,thumb} = req.body
    const add = await Series.insertMany([{
        title,
        description:desc,
        thumbnail:thumb,
    }])
    res.redirect('/movie-admin')
})

Router.post('/series/season',async(req,res) => {
    const {title,desc,thumb,of} = req.body
    const add = await Seasons.insertMany([{
        title,
        description:desc,
        thumbnail:thumb,
        of:of
    }])
    res.redirect('/movie-admin')
})

Router.post('/series/episodes',async(req,res) => {
    const {title,desc,thumb,of,downloadUrl,watchUrl,season} = req.body
    const add = await Episodes.insertMany([{
        title,
        description:desc,
        thumbnail:thumb,
        of:of,
        season:season,
        downloadUrl:downloadUrl,
        watchUrl:watchUrl
    }])
    res.redirect('/movie-admin')
})

module.exports = Router