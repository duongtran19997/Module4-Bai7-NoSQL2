
import {Schema, model} from "mongoose";

interface Ibook{
    title: string;
    description: string;
    author: string;
    keywords: object[];
}
const keywordsSchema = new Schema({

    keyword: String

})

const bookSchema = new Schema<Ibook>({
    title:String,
    description:String,
    author:String,
    keywords: [keywordsSchema],
})

const Book = model<Ibook>('Book',bookSchema);

export {Book}