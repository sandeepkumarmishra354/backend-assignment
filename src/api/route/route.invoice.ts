import { Router } from "express";
import { ControllerInvoice } from "../controller/invoice";
import { ValidationInvoice } from "../middleware/validation/validation.invoice";

const routeInvoice = Router();

routeInvoice.post('/create', ValidationInvoice.create, ControllerInvoice.createInvoice);
routeInvoice.get('/invoices', ControllerInvoice.getAll);
routeInvoice.get('/invoices/:id', ControllerInvoice.getSingle);
routeInvoice.put('/update/:id', ValidationInvoice.update, ControllerInvoice.updateInvoice);
// this will accept ?email=example@email.com as a query parameter
routeInvoice.get('/send/:id', ValidationInvoice.send, ControllerInvoice.sendInvoice);

export default routeInvoice;