import { Column, Entity } from "typeorm";
import { ModelBase } from "./model.base";

@Entity({ name: 'line_item' })
export class ModelItem extends ModelBase {

    @Column({ type: 'uuid' })
    public invoice_uuid!: string;

    @Column()
    public name!: string;

    @Column()
    public quantity!: number;

    @Column()
    public totalPrice!: number;
}