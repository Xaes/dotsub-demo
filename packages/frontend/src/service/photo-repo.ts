import IndexedDBRepository from "./repository";
import { IPhoto } from "../../../@types/common";

export default class PhotoRepo extends IndexedDBRepository<IPhoto> {
    private static _singleton: PhotoRepo;

    private constructor() {
        super("photo-store");
    }

    public static get singleton(): PhotoRepo {
        if (!this._singleton) this._singleton = new PhotoRepo();
        return this._singleton;
    }
}
