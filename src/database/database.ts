import { createConnection, Connection } from "typeorm";

export class Database {

    private _connection!: Connection;
    
    public init = async () => {
        this._connection = await createConnection();
        await this._connection.dropDatabase();
        await this._connection.synchronize(true);
    }
}