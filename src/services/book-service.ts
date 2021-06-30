import Book from "../entities/book";

export default interface BookService{

    registerBook(book:Book):Promise<Book>

    retrieveBookById(id:number):Promise<Book>;

    retrieveAllBooks():Promise<Book[]>;

    retrieveByTitle(title:string):Promise<Book[]>;

    updateBook(book:Book):Promise<Book>;

    removeBookById(id:number):Promise<boolean>;

    checkoutBookById(id:number):Promise<Book>;
    
    checkinBookById(id:number):Promise<Book>;
}