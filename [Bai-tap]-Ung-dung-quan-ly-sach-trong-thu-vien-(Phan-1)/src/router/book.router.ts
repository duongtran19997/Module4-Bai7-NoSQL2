import mongoose from "mongoose";
import express from "express";
import multer from 'multer';
import {book} from "../schema/book.model";
import {author} from "../schema/author.model";
import {publisher} from "../schema/publisher.model";
const upload = multer();
const router = express.Router();

router.get('/create',upload.none(), (req, res) => {
    res.render('create')
});

router.post('/create',upload.none(), async(req, res) => {
    const Author = new author({name:req.body.author});
    const Publisher = new publisher({name:req.body.publisher});
    const Book =new book ({
        name: req.body.name,
        author: Author._id,
        publisher: Publisher._id
    });
    await Publisher.save();
    await Author.save();
    await Book.save();

    res.json('success')
});


router.get('/list',upload.none(),async(req, res) => {
    const listBook = await book.find().populate('author','name').populate('publisher','name')
    res.render('listBook', {listBook: listBook});
})

export {router};
