import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connect } from 'mongoose';
import { projectModel, userModel } from './Models/models.js';
import { customizedMulter } from './multer.js';


const app = express();
dotenv.config()
const PORT = process.env.PORT
const URI = process.env.URI
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./views/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('./views/register.html'))
})

app.get('/new-project', (req, res) => {
    res.sendFile(path.resolve('./views/work.html'))
})

app.post('/register', customizedMulter.single("avatar"), (req, res) => {
    const { username, surname, email, job, password, description } = req.body
    const { filename } = req.file

    const user = userModel.create({
        username,
        surname,
        email,
        job,
        description,
        password,
        photo: `/${filename}`
    })

    res.render('index',{user})
})

app.post('/new-project',(req,res)=>{
    const project = projectModel.create
})





app.listen(PORT, () => {
    console.log("server is up")

    connect(URI).then(() => {
        console.log("connected to the mongoDB")
    })
})