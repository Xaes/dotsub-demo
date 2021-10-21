import hyperid from "hyperid";
import localforage from "localforage";
import {
    IBaseEntity,
    IRepository,
    Filter,
    EntityParams,
} from "@dotsub-demo/common/common";

export default class IndexedDBRepository<T extends IBaseEntity>
    implements IRepository<T>
{
    private _store: LocalForage;
    private _id_gen: hyperid.Instance;

    constructor(storeName: string) {
        this._store = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: storeName,
            version: 1,
        });
        this._id_gen = hyperid();
    }

    async save(entity: EntityParams<T>): Promise<T> {
        const fullEntity: T = {
            ...(entity as T),
            id: this._id_gen(),
            createdAt: new Date(),
        };
        return this._store.setItem(fullEntity.id, fullEntity);
    }

    async getById(id: string): Promise<T> {
        const entity = await this._store.getItem<T>(id.toString());
        if (entity) return entity;
        else throw new Error("Entity not found");
    }

    async getAll(filter?: Filter<T>): Promise<T[]> {
        const results: T[] = [];
        await this._store.iterate((value: T) => {
            if (filter) {
                if (filter(value)) results.push(value);
            } else results.push(value);
        });
        return results;
    }

    async delete(id: string): Promise<void> {
        return this._store.removeItem(id.toString());
    }
}
