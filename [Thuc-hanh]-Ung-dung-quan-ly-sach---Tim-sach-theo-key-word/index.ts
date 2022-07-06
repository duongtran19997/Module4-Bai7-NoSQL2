import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 4000;
import bookRoutes from './src/router/book.router';


app.set('view engine', 'ejs');
app.set('views','./src/views');

const DB_URL = 'mongodb+srv://root:Password@cluster0.l1wd2.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DB_URL)

    .then(() => console.log('DB Connected!'))

    .catch(error => console.log('DB connection error:', error.message));

app.use(bodyParser.json())
app.use('/book', bookRoutes);

app.listen(PORT,()=>{
    console.log(`listening fuck on port ${PORT}`);
});