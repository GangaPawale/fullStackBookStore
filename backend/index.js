import express from 'express';
import PORT from './config.js'
import {MangoDBURL} from './config.js'
import mongoose from 'mongoose';
// import {Book} from './models/bookModel.js';

import React from 'react'
import bookRoute from './routes/bookRoute.js'
import cors from 'cors'

const app=express()
app.use(express.json());
app.use(cors());
app.use('/books', bookRoute);
// app.use('/books',bookRoute)
app.get('/',(req,res)=>{
    console.log(req)
    res.send().status(200)
}) 




mongoose.connect(MangoDBURL)
.then(()=>{
    console.log("you have connected successfully to Database")
})
.catch((error)=>{
    console.log(error);
    console.log("there is error in Database Connection")
})




app.listen(PORT,()=>{

    console.log("app is listning on ",PORT)

})