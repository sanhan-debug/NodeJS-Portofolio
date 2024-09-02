import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connect } from 'mongoose';
import { projectModel, userModel } from './Models/models.js';
import { customizedMulter } from './multer.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const app = express();
dotenv.config()
const PORT = process.env.PORT
const URI = process.env.URI
const SECRET_KEY = process.env.SECRET_KEY
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

app.post('/register', customizedMulter.single("avatar"), async (req, res) => {
    try {
        const { username, surname, email, job, password, description } = req.body;
        const { filename } = req.file;
        const hashingPass = bcrypt.hashSync(password, 10)

        const user = await userModel.create({
            username,
            surname,
            email,
            job,
            description,
            password: hashingPass,
            photo: `/${filename}`
        });

        res.send(user)

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await userModel.findOne({ username })

    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            res.send("sucess")
        } else {
            res.send("password is incorrect")
        }
    } else {
        res.send("user is not defined")
    }

})

app.post('/new-project', (req, res) => {
    const project = projectModel.create
})





app.listen(PORT, () => {
    console.log("server is up")

    connect(URI).then(() => {
        console.log("connected to the mongoDB")
    })
})