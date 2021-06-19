import { Request, Response } from "express";
import { InvoiceStatus, PaymentMode } from "../../database/model/model.invoice";

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

export interface ILineItems {
    name: string,
    quantity: number,
    totalPrice: number,
}

export interface INewInvoice {
    name: string,
    address: string,
    email: string,
    phone: string,
    dueDate: Date,
    notes: string[],
    status: InvoiceStatus,
    paymentMode: PaymentMode,
    lineItems: ILineItems[]
}