import { IAlbum, IPhoto, IService, IShareable } from "@dotsub-demo/common/common";

class Service implements IService {
    getAllAlbums(): Promise<IAlbum[]> {
        throw new Error("Method not implemented.");
    }
    getAllPhotos(): Promise<IPhoto[]> {
        throw new Error("Method not implemented.");
    }
    getPhotosByAlbum(albumId: Pick<IAlbum, "id">): Promise<IPhoto[]> {
        throw new Error("Method not implemented.");
    }
    getAlbumById(albumId: Pick<IAlbum, "id">): Promise<IAlbum> {
        throw new Error("Method not implemented.");
    }
    getPhotoById(photoId: Pick<IPhoto, "id">): Promise<IPhoto> {
        throw new Error("Method not implemented.");
    }
    addPhoto(photo: IPhoto): Promise<IPhoto> {
        throw new Error("Method not implemented.");
    }
    addAlbum(albumId: Pick<IAlbum, "id">): Promise<IAlbum> {
        throw new Error("Method not implemented.");
    }

    share(shareableEntity: IShareable): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    includePhotoInAlbum(photoId: Pick<IPhoto, "id">, albumId: Pick<IAlbum, "id">) {
        throw new Error("Method not implemented.");
    }
}
