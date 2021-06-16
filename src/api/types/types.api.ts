import { Request, Response } from "express";

interface MyRequest extends Request {
    //
}
interface MyResponse extends Response {
    //
}

export type TController = (req: MyRequest, res: MyResponse) => void
export type TMiddleware = (req: MyRequest, res: MyResponse, next: () => void) => void
export type THelper = {
    code: number,
    message: string,
    data: any
}