import { InvoiceStatus } from "../../../database/model/model.invoice";
import { TController } from "../../types/types.api";
import {
    createNewInvoice, getAllInvoices, getSingleInvoice,
    sendInvoiceAsMail, updateInvoiceStatus
} from "./helper";

export namespace ControllerInvoice {

    export const createInvoice: TController = async (req, res) => {
        const data = await createNewInvoice(req.body);
        res.status(data.code).send({
            message: data.message,
            payload: data.data
        });
    }

    export const getAll: TController = async (req, res) => {
        const data = await getAllInvoices();
        res.status(data.code).send({
            message: data.message,
            payload: data.data
        });
    }

    export const getSingle: TController = async (req, res) => {
        const data = await getSingleInvoice(req.params.id);
        res.status(data.code).send({
            message: data.message,
            payload: data.data
        });
    }

    export const updateStatus: TController = async (req, res) => {
        const data = await updateInvoiceStatus(req.params.id, req.query.status as InvoiceStatus);
        res.status(data.code).send({
            message: data.message,
            payload: data.data
        });
    }

    export const sendInvoice: TController = async (req, res) => {
        const data = await sendInvoiceAsMail(req.params.id);
        res.status(data.code).send({
            message: data.message,
            payload: data.data
        });
    }
}