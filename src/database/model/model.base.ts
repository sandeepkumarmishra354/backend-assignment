import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

export class ModelBase {
    @PrimaryColumn({ generated: 'increment' })
    public id!: number;
    @PrimaryColumn({ generated: 'uuid' })
    public uuid!: string;
    @CreateDateColumn()
    public createdAt!: Date;
    @UpdateDateColumn()
    public updatedAt!: Date;
}