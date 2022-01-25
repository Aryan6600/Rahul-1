const express = require('express')
const app = express()
const path = require('path')
const Movies = require('./db/Schemas/Movies')
const Admin = require('./admin/Admin')
const session = require('express-session')
const Series = require("./db/Schemas/Series")
const Seasons = require('./db/Schemas/Seasons')
const Episodes = require('./db/Schemas/Episodes')
const Store = require('./db/Schemas/Store')


app.set('view engine','pug')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: 'iAmTHeKinG',
    resave: true,
    saveUninitialized: true
}))

app.use('/dist',express.static(path.join(__dirname,'dist')))

app.get('/',(req,res) => {
    res.render('main')
})

app.get('/search',async(req,res) => {
    const q = req.query.q
    const query = { $text: { $search: q.toString() } };
    const movies = await Movies.find(query)
    const series = await Series.find(query)
    res.render('search',{movies,series})
})

app.get('/store',async(req,res) => {
    const apps = await Store.find({})
    res.render('store',{items:apps})
})

app.get('/store/search',async(req,res) => {
    const q = req.query.q
    const query = { $text: { $search: q.toString() } };
    const apps = await Store.find(query)
    res.render('store',{items:apps})
})


app.get('/movies',(req,res) => {
    res.render('movies')
})

app.get('/bollywood',async(req,res) => {
    const movies = await Movies.find({type:"Bollywood"})
    res.render('mainwood',{movies,type:"Bollywood"})
})

app.get('/hollywood',async(req,res) => {
    const movies = await Movies.find({type:"Hollywood"})
    res.render('mainwood',{movies,type:"Hollywood"})
})

app.get('/bollywood/:id',async(req,res) => {
    const id = req.params.id
    try {
        const movie = await Movies.findOne({_id:id,type:"Bollywood"})
        if(!movie) return res.redirect('/bollywood')
        res.render('middle',{download:movie.downloadPath,view:movie.viewPath})
    } catch (error) {
        res.send('Internal Server Error')
    }
})

app.get('/hollywood/:id',async(req,res) => {
    const id = req.params.id
    try {
        const movie = await Movies.findOne({_id:id,type:"Hollywood"})
        if(!movie) return res.redirect('/hollywood')
        res.render('middle',{download:movie.downloadPath,view:movie.viewPath})
    } catch (error) {
        res.send('Internal Server Error')
    }
})


app.get('/series',async(req,res) => {
    const series = await Series.find({})
    res.render('mainwood',{type:"Web Series",movies:series})
})

app.get('/series/:id',async(req,res) => {
    const id = req.params.id
    const series = await Series.findOne({_id:id})
        const seasons = await Seasons.find({of:series.title})
    res.render('mainwood',{type:series.title,movies:seasons})
})

app.get('/series/:id/:sid',async(req,res) => {
    const id = req.params.id
    try {
        const series = await Series.findOne({_id:id})
        const seasons = await Seasons.findOne({of:series.title,_id:req.params.sid})
        const episodes = await Episodes.find({of:series.title,season:seasons.title})
        res.render('mainwood',{type:series.title,movies:episodes})
    } catch (error) {
        res.send('Internal Server Error')
    }
    
})

app.get('/series/:id/:sid/:eid',async(req,res) => {
    try {
        const episode = await Episodes.findOne({_id:req.params.eid})
        res.render('middle',{download:episode.downloadUrl,view:episode.watchUrl})
    } catch (error) {
        res.send('Internal Server Error')
    }
    
})

app.use('/movie-admin',Admin)

app.listen(80,()=>{
    console.log("running on localhost");
})

