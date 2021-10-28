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
            name: "dotsub-demo",
            driver: localforage.INDEXEDDB,
            storeName: storeName,
        });
        this._id_gen = hyperid({ urlSafe: true });
    }

    async save(entity: EntityParams<T>): Promise<T> {
        const fullEntity: T = {
            ...(entity as T),
            id: this._id_gen(),
            createdAt: new Date().toString(),
        };
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await this._store.setItem<T>(fullEntity.id, fullEntity);
    }

    async getById(id: string): Promise<T> {
        const entity = await this._store.getItem<T>(id.toString());
        await new Promise((resolve) => setTimeout(resolve, 100));
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
        await new Promise((resolve) => setTimeout(resolve, 500));
        return results;
    }

    async delete(id: string): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return this._store.removeItem(id.toString());
    }

    async update(entity: T): Promise<T> {
        return this._store.setItem<T>(entity.id, entity);
    }
}
