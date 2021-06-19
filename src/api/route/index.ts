import { Router, json } from "express";
import routeInvoice from "./route.invoice";

const router = Router();

router.use(json());
router.use('/api/invoice', routeInvoice);
// 404 handler
router.use(async (req, res, next) => {
    res.status(404).send({
        message: "path not found",
        payload: {
            method: req.method,
            path: req.originalUrl
        }
    });
});

export default router;