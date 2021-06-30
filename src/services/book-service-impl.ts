import Book from "../entities/book";
import BookDAO from "../daos/book-dao";

import BookService from "./book-service";

export default class BookServiceImpl implements BookService{

    constructor(private bookDAO:BookDAO){}

    async registerBook(book: Book): Promise<Book> {
        return this.bookDAO.createBook(book);
    }

    async retrieveBookById(id: number): Promise<Book> {
        return this.bookDAO.getBookById(id);
    }

    async retrieveAllBooks(): Promise<Book[]> {
        return this.bookDAO.getAllBooks();
    }

    async updateBook(book: Book): Promise<Book> {
        return this.bookDAO.updateBook(book);
    }

    async removeBookById(id: number): Promise<boolean> {
        return this.bookDAO.deleteBookById(id);
    }

    async checkoutBookById(id: number): Promise<Book> {
        const book:Book = await this.bookDAO.getBookById(id)
        book.isAvailable = false;
        book.returnDate = new Date().getTime() +1_209_600; 
        await this.bookDAO.updateBook(book)
        return book;
    }

    async checkinBookById(id: number): Promise<Book> {
        const book:Book = await this.bookDAO.getBookById(id)
        book.isAvailable = true;
        book.returnDate = 0;
        await this.bookDAO.updateBook(book)
        return book;
    }

    async retrieveByTitle(title: string): Promise<Book[]> {
        const allBooks:Book[] = await this.bookDAO.getAllBooks();
        const filteredBooks = allBooks.filter(book => book.title.includes(title))
        return filteredBooks
    }
    
    
}