import * as dotenv from 'dotenv';dotenv.config({path:"C:/Users/AdamRanieri/Desktop/BookApiTypeScript/app.env"})
import express from 'express';
import BookController from './controllers/book-controller';
import BookDAO from './daos/book-dao';
import BookDaoPostgres from './daos/book-dao-postgres';
import BookService from './services/book-service';
import BookServiceImpl from './services/book-service-impl';
import * as winston from "winston"


const app = express();
app.use(express.json());

const bookDao:BookDAO = new BookDaoPostgres();
const bookService:BookService = new BookServiceImpl(bookDao);
const bookController = new BookController(bookService);

app.get("/books", bookController.getAllBooks);
app.get("/books/:id", bookController.getBookById);

app.post('/books', bookController.createBook);

app.put("/books/:id", bookController.updateBook);

app.delete("/books/:id", bookController.deleteBook);

app.patch("/books/checkout/:id", bookController.checkoutBook);
app.patch("/books/checkin/:id", bookController.checkinBook)

app.listen(3000,()=> console.log("started"))