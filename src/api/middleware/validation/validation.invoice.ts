import * as yup from 'yup';
import { TMiddleware } from '../../types/types.api';

const status = ['DUE', 'PAID', 'CANCELLED'];
const paymentMode = ['CASH', 'DD', 'ONLINE', 'CHEQUE'];

const schemaItems = {
    name: yup.string().required(),
    quantity: yup.number().integer().required(),
    totalPrice: yup.number().required(),
}

const schemaCreate = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().length(10).required(),
    dueDate: yup.date(),
    notes: yup.array(yup.string()).default([]),
    status: yup.string().oneOf(status).default(status[0]),
    paymentMode: yup.string().oneOf(paymentMode).default(paymentMode[0]),
    lineItems: yup.array(yup.object().shape({ ...schemaItems })).min(1).required()
});
const schemaUpdateStatus = yup.object().shape({
    status: yup.string().oneOf(status).required(`status must be one of ${status.join(',')}`)
});

export namespace ValidationInvoice {
    export const create: TMiddleware = async (req, res, next) => {
        try {
            req.body = await schemaCreate.validate(req.body);
            next();
        } catch (err) {
            console.error(err);
            res.status(400).json({
                message: `${err.message ?? "error"}`,
                payload: {}
            });
        }
    }

    export const updateStatus: TMiddleware = async (req, res, next) => {
        try {
            req.query = await schemaUpdateStatus.validate(req.query);
            next();
        } catch (err) {
            console.error(err);
            res.status(400).json({
                message: `${err.message ?? "error"}`,
                payload: {}
            });
        }
    }
}