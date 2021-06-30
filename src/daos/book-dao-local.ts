import Book from "../entities/book";
import BookDAO from "./book-dao";

export default class BookDaoLocal implements BookDAO{

    private bookTable:Map<number,Book> = new Map();
    private counter:number = 0;

    async createBook(book: Book): Promise<Book> {
        this.counter += 1;
        book.bookId = this.counter;
        this.bookTable.set(this.counter,book);
        return book;
    }
    async getBookById(id: number): Promise<Book> {
        return this.bookTable.get(id);
    }
    async getAllBooks(): Promise<Book[]> {
        return [...this.bookTable.values()];
    }
    async updateBook(book: Book): Promise<Book> {
        this.bookTable.set(book.bookId,book);
        return book;
    }
    async deleteBookById(id: number): Promise<boolean> {
        return this.bookTable.delete(id);
    }
    
}