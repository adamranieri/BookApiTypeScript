import { Request, Response } from "express";
import ResourceNotFoundError from "./resource-not-found";

export default function errorHandler(err:any, req: Request, res: Response){
    if(err instanceof ResourceNotFoundError){
        res.status(404)
        res.send(err.message)
    }else{
        res.status(500)
        res.send("We have a problem")
    }
}