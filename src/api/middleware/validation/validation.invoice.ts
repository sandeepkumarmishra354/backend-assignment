import * as yup from 'yup';
import { TMiddleware } from '../../types/types.api';

const schemaCreate = yup.object().shape({
    //
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