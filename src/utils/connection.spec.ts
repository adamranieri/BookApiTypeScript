import * as dotenv from 'dotenv';dotenv.config({path:"C:/Users/AdamRanieri/Desktop/BookApiTypeScript/app.env"})
import {client} from "./connection"

test("Should create return a book", async ()=>{
    const result = await client.query("select * from book")
})