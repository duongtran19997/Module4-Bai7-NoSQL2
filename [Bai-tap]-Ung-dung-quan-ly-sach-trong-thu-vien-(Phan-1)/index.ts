import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import {router} from "./src/router/book.router"
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const URL = 'mongodb+srv://root:Password@cluster0.l1wd2.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(URL).then(() => {
    console.log(`DB connection established`)
}).catch(err => {
    console.log(`Error connecting to MongoDB`)
});

app.use('/book',router)

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});