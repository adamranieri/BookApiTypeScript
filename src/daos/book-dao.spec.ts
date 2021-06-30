import * as dotenv from 'dotenv';dotenv.config({path:"C:/Users/AdamRanieri/Desktop/BookApiTypeScript/app.env"})
import Book from "../entities/book"
import BookDAO from "./book-dao"
import BookDaoPostgres from "./book-dao-postgres";

const bookDAO:BookDAO = new BookDaoPostgres()

const testBook:Book = new Book(0,"Dracula","Bram Stoker",true,1,0);

test("create Book", async ()=>{
    const book:Book = await bookDAO.createBook(testBook);
    expect(testBook.bookId).not.toBe(0);
})

test("get book by id", async ()=>{
    const book:Book = await bookDAO.getBookById(testBook.bookId)
    expect(book.title).toBe("Dracula")
})

test("update book", async ()=>{
    testBook.title = "Dracula 2: Revenge of the Fang"
    await bookDAO.updateBook(testBook)
    const book:Book = await bookDAO.getBookById(testBook.bookId)
    expect(book.title).toBe("Dracula 2: Revenge of the Fang")
})

test("get all books", async ()=>{
    const book1 = new Book(0,"Catcher in the Rye","Salinger",true,1,0);
    const book2 = new Book(0,"Frankenstein","Mary Shelley",true,1,0);
    const book3 = new Book(0,"The Hobbit","J.R. Tolkien",true,1,0);
    await bookDAO.createBook(book1);
    await bookDAO.createBook(book2);
    await bookDAO.createBook(book3);

    const books:Book[] = await bookDAO.getAllBooks();
    expect(books.length).toBeGreaterThanOrEqual(3);
})

test("delete book by id", async ()=>{
    const result  = await bookDAO.deleteBookById(testBook.bookId);
    expect(result).toBeTruthy()
})