import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { userRoute } from './Routes/userRoutes.js';
import { pageRouter } from './Routes/pageRouters.js';


const app = express();

// dotenv
dotenv.config()
// env keys
const PORT = process.env.PORT
const URI = process.env.URI

// middlewares : static files, json, ejs
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")


// routers
app.use('/',userRoute)
app.use('/',pageRouter)


// server listening
app.listen(PORT, () => {
    console.log("server is up")

    connect(URI).then(() => {
        console.log("connected to the mongoDB")
    })
})