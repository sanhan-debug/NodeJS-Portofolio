import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connect } from 'mongoose';


const app = express();
dotenv.config()
const PORT = process.env.PORT
const URI = process.env.URI
app.use(express.static('public'))



app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./views/index.html'))
})

app.get('/login',(req,res)=>{
    res.sendFile(path.resolve('./views/login.html'))
})

app.get('/register',(req,res)=>{
    res.sendFile(path.resolve('./views/register.html'))
})

app.listen(PORT,()=>{
    console.log("server is up")

    connect(URI).then(()=>{
        console.log("connected to the mongoDB")
    })
})