export default class Book{

    constructor(
        public bookId:number,
        public title:string,
        public author:string,
        public isAvailable:boolean,
        public quality:number,
        public returnDate:number
    ){}

}