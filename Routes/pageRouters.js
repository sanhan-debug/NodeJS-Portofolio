import { Router } from "express";
import path from 'path'

export const pageRouter = new Router();


pageRouter.get('/',(req,res)=>{
    res.sendFile(path.resolve('./views/home.html'))
})

pageRouter.get('/profile', (req, res) => {
    res.render('profile')
})

pageRouter.get('/login', (req, res) => {
    res.sendFile(path.resolve('./views/login.html'))
})

pageRouter.get('/register', (req, res) => {
    res.sendFile(path.resolve('./views/register.html'))
})

pageRouter.get('/new-project', (req, res) => {
    res.sendFile(path.resolve('./views/work.html'))
})