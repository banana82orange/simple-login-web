// const express = require('express') //normal import
import express from "express";
import cors from  'cors';
import morgan from "morgan";
import authRouter from "./api/routers/authRouter.js";

import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import path from 'path';
//for filepath config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load multiple .env files
const envFiles = ['../.env', '../.env.development' , "../.env.production"]; // order matters

envFiles.forEach(file => {
  const envPath = path.resolve(__dirname, file);
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    console.warn(`Could not load ${file}:`, result.error.message);
  } else {
    console.log(`Loaded config from ${file}`);
  }
});

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());


//Routing
// get , post , put , patch  ,delete
app.use("/auth", authRouter)

//error handle
app.use( (err,req,res,next) => {
    // res.json({message:"error"})
    res.status(err.code || 500).json({message:err.message ||"something wrong!!"})
    console.log(err);
})

app.listen(process.env.WB_PORT , ()=> console.log("server running on port "+ process.env.WB_PORT))

