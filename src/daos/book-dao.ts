import Book from "../entities/book";


export default interface BookDAO{

    //CREATE
    createBook(book:Book):Promise<Book>

    //READ
    getBookById(id:number):Promise<Book>
    getAllBooks():Promise<Book[]>

    //UPDATE
    updateBook(book:Book):Promise<Book>

    //DELETE
    deleteBookById(id:number):Promise<boolean>

}