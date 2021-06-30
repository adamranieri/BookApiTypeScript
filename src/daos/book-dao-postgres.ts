import { client } from "../utils/connection";
import Book from "../entities/book";
import BookDAO from "./book-dao";
import ResourceNotFoundError from "../errors/resource-not-found";

interface BookRecord{
    book_id:number,
    title:string,
    author:string,
    available:boolean,
    quality:number,
    return_date:number
}

export default class BookDaoPostgres implements BookDAO{

    private connection = client;

    async createBook(book: Book): Promise<Book> {
        const sql = "INSERT INTO book(title,author,available,quality,return_date) VALUES ($1,$2,$3,$4,$5) RETURNING book_id"
        const values = [book.title,book.author,book.isAvailable,book.quality,book.returnDate]
        const result = await this.connection.query(sql,values);
        const bookId = result.rows[0].book_id;
        book.bookId = bookId;
        return book;
    }

    async getBookById(id: number): Promise<Book> {
        const sql = "SELECT * FROM book where book_id = $1";
        const values = [id];
        const result = await this.connection.query(sql,values);
        if(result.rowCount === 0){
            throw new ResourceNotFoundError(id);
        }
        const bookRecord:BookRecord = result.rows[0];
        const book:Book = new Book(id,bookRecord.title,bookRecord.author,bookRecord.available,bookRecord.quality,bookRecord.return_date) 
        return book;
    }

    async getAllBooks(): Promise<Book[]> {
        const sql = "SELECT * FROM book";
        const result = await this.connection.query(sql);
        const allBooks:Book[] = []
        for(const bookRecord of result.rows as BookRecord[]){
            const book:Book = new Book(bookRecord.book_id,bookRecord.title,bookRecord.author,bookRecord.available,bookRecord.quality,bookRecord.return_date) 
            allBooks.push(book);
        }
        return allBooks;
    }
    async updateBook(book: Book): Promise<Book> {
        const sql = "UPDATE book SET title=$1, author=$2, available=$3, quality=$4, return_date=$5 WHERE book_id=$6"
        const values = [book.title,book.author,book.isAvailable,book.quality,book.returnDate,book.bookId]
        const result = await this.connection.query(sql,values);
        if(result.rowCount === 0){
            throw new ResourceNotFoundError(book.bookId);
        }
        return book;
    }

    async deleteBookById(id: number): Promise<boolean> {
        const sql = "DELETE FROM book WHERE book_id = $1";
        const values = [id];
        const result = await this.connection.query(sql,values)
        if(result.rowCount === 0){
            throw new ResourceNotFoundError(id);
        }
        return true
    }

}