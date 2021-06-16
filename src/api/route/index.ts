import { Router } from "express";
import routeInvoice from "./route.invoice";

const router = Router();

router.use('/invoice', routeInvoice);

export default router;