
import { Router } from 'express';

const bookRoutes = Router();

import { Book } from "../schemas/book.model";

import multer from 'multer';
import {Author} from "../schemas/author.model";

const upload = multer();


bookRoutes.get('/create', (req, res) => {

    res.render("createBook");

});



bookRoutes.post('/create', upload.none(), async (req, res) => {

    try {
        const authorNew = new Author({

            name: req.body.author

        })
        await authorNew.save();


        const bookNew = new Book({
            title: req.body.title,
            description: req.body.description,
            author: authorNew._id,
        });
        bookNew.keywords.push({keyword: req.body.keyword});
        console.log(bookNew);
         await bookNew.save();
        if (bookNew) {

            res.render("success");

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});



bookRoutes.post('/update', upload.none(), async (req, res) => {

    try {

        const book = await Book.findOne({ _id: req.body.id });

        book.title = req.body.title;

        book.description = req.body.description;

        book.author = req.body.author;

        await book.save();

        if (book) {

            res.render("success");

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});

bookRoutes.get('/list', async (req, res) => {

    try {

        let query = {};

        if (req.query.keyword && req.query.keyword !== "") {

            let keywordFind = req.query.keyword || "";

            query = {

                "keywords.keyword": {

                    $regex: keywordFind

                }

            }

        }

        if (req.query.author && req.query.author !== "") {

            let authordFind = req.query.author || "";

            let author = await Author.findOne({name: { $regex: authordFind}})

            query = {

                ...query,

                author: author

            }

        }

        const books = await Book.find(query).populate({

            path: "author", select: "name"

        });

        res.render("listBook", { books: books });

    } catch {

        res.render("error");

    }

});



bookRoutes.get('/update/:id', async (req, res) => {

    try {

        const book = await Book.findOne({ _id: req.params.id });

        console.log(book, 'book')

        if (book) {

            res.render("updateBook", {book: book})

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});



bookRoutes.delete('/delete/:id', async (req, res) => {

    try {

        const book = await Book.findOne({ _id: req.params.id });

        if (book) {

            await book.remove();

            res.status(200).json({ message: "success" });

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});



export default bookRoutes;