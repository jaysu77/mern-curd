const express = require('express');
const cors =require('cors');
const mongoose =require('mongoose');
const bodyParser =require('body-parser')

require('dotenv').config();

const app =express();

app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});

const connection =mongoose.connection;
 connection.once('open',()=>{
     console.log("Monogo DB connection established successfully")
 })

 const usersRouter = require('./routes/users');
 const exerciseRoute= require('./routes/exercises');

 app.use('/exercises',exerciseRoute);
 app.use('/users',usersRouter);

app.listen(port,()=>{
    console.log(`Server is running on port :${port}`);
});
