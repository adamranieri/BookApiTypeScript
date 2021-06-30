import { Client } from "pg"


export const client = new Client({
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:Number(process.env.PORT),
    host:process.env.HOST
})
client.connect()
