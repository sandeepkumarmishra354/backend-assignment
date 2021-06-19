import { Router } from "express";
import { ControllerInvoice } from "../controller/invoice";
import { ValidationInvoice } from "../middleware/validation/validation.invoice";

const routeInvoice = Router();

routeInvoice.post('/create', ValidationInvoice.create, ControllerInvoice.createInvoice);
routeInvoice.get('/list', ControllerInvoice.getAll);
routeInvoice.get('/list/:id', ControllerInvoice.getSingle);
// this will accept ?status=NEW_STATUS as a query parameter
routeInvoice.put('/update-status/:id', ValidationInvoice.updateStatus, ControllerInvoice.updateStatus);
routeInvoice.get('/send-mail/:id', ControllerInvoice.sendInvoice);

export default routeInvoice;