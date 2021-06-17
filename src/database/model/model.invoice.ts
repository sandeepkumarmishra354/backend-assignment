import { Column, Entity } from "typeorm";
import { ModelBase } from "./model.base";

export enum InvoiceStatus {
    DUE = "DUE",
    PAID = "PAID",
    CANCELLED = "CANCELLED"
};
export enum PaymentMode {
    CASH = "CASH",
    DD = "DD",
    ONLINE = "ONLINE",
    CHEQUE = "CHEQUE"
}

@Entity({ name: 'invoice' })
export class ModelInvoice extends ModelBase {
    @Column()
    public name!: string;

    @Column()
    public address!: string;

    @Column()
    public email!: string;

    @Column()
    public phone!: string;

    @Column()
    public dueDate!: Date;

    @Column()
    public notes!: string;

    @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.DUE })
    public status!: InvoiceStatus;

    @Column({ type: 'enum', enum: PaymentMode, default: PaymentMode.CASH })
    public paymentMode!: PaymentMode;
}