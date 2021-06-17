import * as yup from 'yup';
import { TMiddleware } from '../../types/types.api';

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
    dueDate: yup.date().default(() => new Date()),
    notes: yup.array(yup.string()),
    status: yup.string().oneOf(['DUE', 'PAID', 'CANCELLED']),
    paymentMode: yup.string().oneOf(['CASH', 'DD', 'ONLINE', 'CHEQUE']),
    lineItems: yup.array(yup.object().shape({ ...schemaItems })).min(1)
});
const schemaUpdate = yup.object().shape({
    //
});
const schemaSend = yup.object().shape({
    //
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

    export const update: TMiddleware = async (req, res, next) => {
        try {
            req.body = await schemaUpdate.validate(req.body);
            next();
        } catch (err) {
            console.error(err);
            res.status(400).json({
                message: `${err.message ?? "error"}`,
                payload: {}
            });
        }
    }

    export const send: TMiddleware = async (req, res, next) => {
        try {
            req.query = await schemaSend.validate(req.query);
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