import { getRepository, Repository } from "typeorm";
import { ModelItem } from "../model/model.item";

class RepoItem {
    private _repo!: Repository<ModelItem>;

    public get repo() {
        if (!this._repo)
            this._repo = getRepository(ModelItem);
        return this._repo;
    }
}

export const repoItem = new RepoItem();