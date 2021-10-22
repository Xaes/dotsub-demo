import IndexedDBRepository from "./repository";
import { IPhotoData } from "../../../@types/common";

export default class PhotoDataRepo extends IndexedDBRepository<IPhotoData> {
    private static _singleton: PhotoDataRepo;

    private constructor() {
        super("photo-data-store");
    }

    public static get singleton(): PhotoDataRepo {
        if (!this._singleton) this._singleton = new PhotoDataRepo();
        return this._singleton;
    }
}
