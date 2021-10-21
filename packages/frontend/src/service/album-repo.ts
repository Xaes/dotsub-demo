import IndexedDBRepository from "./repository";
import { IAlbum } from "../../../@types/common";

export default class AlbumRepo extends IndexedDBRepository<IAlbum> {

    private static _singleton: AlbumRepo

    private constructor() {
        super("album-store");
    }

    public static get singleton(): AlbumRepo {
        if (!this._singleton) this._singleton = new AlbumRepo();
        return this._singleton;
    }
}