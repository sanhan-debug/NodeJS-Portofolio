import { Router } from "express";
import { customizedMulter } from '../multer.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { projectModel, userModel } from '../Models/models.js';
import { authenticateUser } from "../Middleware/authMiddleware.js";





export const userRoute = new Router()


userRoute.post('/register', customizedMulter.single("avatar"), async (req, res) => {
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

userRoute.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await userModel.findOne({ username })
    const SECRET_KEY = process.env.SECRET_KEY


    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            // const token = jwt.sign({ user }, SECRET_KEY)
            // res.send(token)
            res.render('profile',{user})
        } else {
            res.send("password is incorrect")
        }
    } else {
        res.send("user is not defined")
    }

})


userRoute.post('/new-project' ,customizedMulter.single('photo'), async (req, res) => {
    try {
        const { projectname, description } = req.body;
        const userId = req.user; 
        const photo = req.file 

        if (projectname && description) {
            const project = projectModel.create({
                projectname,
                description,
                userId,
                photo
            })
            res.status(201).send(project)
        }else{
            return res.status(400).send('Project name və description tələb olunur');
        }
      
    } catch (error) {
        console.error(error);
        res.status(500).send('Serverdə xəta baş verdi');
    }
});