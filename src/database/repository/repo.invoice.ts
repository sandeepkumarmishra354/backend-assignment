import { getRepository, Repository } from "typeorm";
import { ModelInvoice } from "../model/model.invoice";

class RepoInvoice {
    private _repo!: Repository<ModelInvoice>;

    public get repo() {
        if(!this._repo)
            this._repo = getRepository(ModelInvoice);
        return this._repo;
    }
}

export const repoInvoice = new RepoInvoice();