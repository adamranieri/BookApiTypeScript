import { Request, Response } from "express";
import errorHandler from "../errors/error-handler";
import Book from "../entities/book";
import BookService from "../services/book-service";

export default class BookController {


    constructor(private bookService: BookService) {}

    getAllBooks = async (req: Request, res: Response): Promise<void> => {

        try {
            const title = <string> req.query.title;
            let books: Book[] = []
            if(title){
                books = await this.bookService.retrieveByTitle(title);
            }else{
                books = await this.bookService.retrieveAllBooks();
            }
            res.status(200);
            res.send(books);        
        } catch (error) {
            errorHandler(error,req,res)
        }
        
    }

    getBookById = async (req: Request, res: Response): Promise<void> => {

        try {
            const id = Number(req.params.id)
            const book: Book = await this.bookService.retrieveBookById(id);
            res.send(book)        
        } catch (error) {
            errorHandler(error,req,res)
        }
    }

    createBook = async (req: Request, res: Response): Promise<void> => {

        try {
            let book: Book = req.body
            book = await this.bookService.registerBook(book)
            res.status(201)
            res.send(book)           
        } catch (error) {
            errorHandler(error,req,res)
        }

    }

    updateBook = async (req: Request, res: Response): Promise<void> => {

        try {
            const id = Number(req.params.id);
            let book: Book = req.body;
            book.bookId = id
            book = await this.bookService.updateBook(book);
            res.send(book);       
        } catch (error) {
            errorHandler(error,req,res)
        }

    }

    deleteBook = async (req: Request, res: Response): Promise<void> => {

        try {
            const id = Number(req.params.id)
            const result = await this.bookService.removeBookById(id)
            if (result) {
                res.status(200)
                res.send(`Book with the ID:${id} successfully deleted`)
            } else {
                res.status(400)
                res.send(`Book with the ID:${id} could not be deleted`)
            }          
        } catch (error) {
            errorHandler(error,req,res)
        }
    }

    checkoutBook = async (req: Request, res: Response): Promise<void> => {

        try {
            const id = Number(req.params.id);
            const book: Book = await this.bookService.checkoutBookById(id)
            res.send(book)      
        } catch (error) {
            errorHandler(error,req,res)
        }
    }

    checkinBook = async (req: Request, res: Response): Promise<void> => {

        try {
            const id = Number(req.params.id);
            const book: Book = await this.bookService.checkinBookById(id)
            res.send(book)       
        } catch (error) {
            errorHandler(error,req,res)
        }
    }

}