import {Author} from "./author.model";
import {Schema, model} from "mongoose";

interface Ibook{
    title: string;
    description: string;
    author: object;
    keywords: object[];
}
const keywordsSchema = new Schema({
    keyword: String
});




const bookSchema = new Schema<Ibook>({
    title:String,
    description:String,
    author:{ type:Schema.Types.ObjectId, ref: "Author" },
    keywords: [keywordsSchema]
})

const Book = model<Ibook>('Book',bookSchema);

export {Book}