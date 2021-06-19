import { InvoiceStatus, ModelInvoice } from "../../../database/model/model.invoice";
import { ModelItem } from "../../../database/model/model.item";
import { repoInvoice } from "../../../database/repository/repo.invoice";
import { repoItem } from "../../../database/repository/repo.item";
import { sendMail } from "../../../utils/mailer";
import { INewInvoice} from "../../types/types.api";

const getDueDate = () => {
    let d = new Date();
    d.setDate(d.getDate() + 5);// set 5 days from today
    return d;
}

const getInvoiceJson = (invoice: ModelInvoice) => ({
    id: invoice.uuid,
    createdAt: invoice.createdAt,
    address: invoice.address,
    dueDate: invoice.dueDate,
    email: invoice.email,
    name: invoice.name,
    paymentMode: invoice.paymentMode,
    phone: invoice.phone,
    status: invoice.status,
    notes: JSON.parse(invoice.notes),
})
const getItemJson = (item: ModelItem) => ({
    id: item.uuid,
    name: item.name,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
})

export const createNewInvoice = async (data: INewInvoice) => {
    try {
        let invoice = new ModelInvoice();
        invoice.name = data.name;
        invoice.address = data.address;
        invoice.dueDate = data.dueDate ?? getDueDate();
        invoice.email = data.email;
        invoice.notes = JSON.stringify(data.notes);
        invoice.paymentMode = data.paymentMode;
        invoice.phone = data.phone;
        invoice.status = data.status;
        invoice = await repoInvoice.repo.save(invoice);
        let lineItems = data.lineItems.map(item => {
            const lineItem = new ModelItem();
            lineItem.invoice_uuid = invoice.uuid;
            lineItem.name = item.name;
            lineItem.quantity = item.quantity;
            lineItem.totalPrice = item.totalPrice;
            return lineItem;
        });
        lineItems = await repoItem.repo.save(lineItems);
        return {
            code: 201,
            message: 'new invoice created',
            data: {
                ...getInvoiceJson(invoice),
                totalAmount: lineItems.reduce((i1, i2) => i1 + i2.totalPrice, 0),
                lineItems: lineItems.map(getItemJson)
            }
        };
    } catch (err) {
        console.error(err);
        return {
            code: 400,
            message: err.message,
            data: {}
        };
    }
}

export const getAllInvoices = async () => {
    try {
        const invoices = await repoInvoice.repo.find();
        const result = [];
        for (let invoice of invoices) {
            const lineItems = await repoItem.repo.find({ where: { invoice_uuid: invoice.uuid } });
            const res = {
                ...getInvoiceJson(invoice),
                totalAmount: lineItems.reduce((i1, i2) => i1 + i2.totalPrice, 0),
                lineItems: lineItems.map(getItemJson)
            }
            result.push(res);
        }
        return {
            code: 200,
            message: `${invoices.length} invoice(s) fetched successfully.`,
            data: result
        };
    } catch (err) {
        console.error(err);
        return {
            code: 400,
            message: err.message,
            data: {}
        };
    }
}

export const getSingleInvoice = async (uuid: string) => {
    try {
        const [invoice, lineItems] = await Promise.all([
            repoInvoice.repo.findOneOrFail({ where: { uuid } }),
            repoItem.repo.find({ where: { invoice_uuid: uuid } }),
        ]);
        return {
            code: 200,
            message: "success",
            data: {
                ...getInvoiceJson(invoice),
                totalAmount: lineItems.reduce((i1, i2) => i1 + i2.totalPrice, 0),
                lineItems: lineItems.map(getItemJson)
            }
        };
    } catch (err) {
        console.error(err);
        return {
            code: 400,
            message: err.message,
            data: {}
        };
    }
}

export const updateInvoiceStatus = async (uuid: string, newStatus: InvoiceStatus) => {
    try {
        let invoice = await repoInvoice.repo.findOneOrFail({ where: { uuid } });
        if(invoice.status !== newStatus) {
            invoice.status = newStatus;
            invoice = await repoInvoice.repo.save(invoice);
        }
        return {
            code: 200,
            message: "status updated",
            data: {
                id: invoice.uuid,
                updatedAt: invoice.updatedAt,
                status: invoice.status
            }
        };
    } catch (err) {
        console.error(err);
        return {
            code: 400,
            message: err.message,
            data: {}
        };
    }
}

export const sendInvoiceAsMail = async (uuid: string) => {
    try {
        const invoice = await repoInvoice.repo.findOneOrFail({where:{uuid}});
        // send mail to the customer here
        const success = await sendMail({
            to: invoice.email,
            subject: "Pay the due amount.",
            text: `Hi ${invoice.name} pay the amount as soon as possible.`
        });
        return {
            code: success ? 200 : 400,
            message: success ? "mail sent successfully." : "Error: something went wrong.",
            data: {
                id: invoice.uuid,
                email: invoice.email,
                name: invoice.name,
            }
        }
    } catch(err) {
        console.error(err);
        return {
            code: 400,
            message: err.message,
            data: {}
        };
    }
}