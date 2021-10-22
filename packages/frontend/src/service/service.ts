import AlbumRepo from "./album-repo";
import PhotoRepo from "./photo-repo";
import {
    EntityParams,
    IAlbum,
    IPhoto,
    IService,
    IShareable,
} from "@dotsub-demo/common/common";

export class Service implements IService {
    private static _singleton: IService;

    private constructor() {
        return;
    }

    getAllAlbums(): Promise<IAlbum[]> {
        return AlbumRepo.singleton.getAll();
    }

    getAllPhotos(): Promise<IPhoto[]> {
        return PhotoRepo.singleton.getAll();
    }

    getPhotosByAlbum(albumId: string): Promise<IPhoto[]> {
        return AlbumRepo.singleton.getById(albumId).then((a) =>
            PhotoRepo.singleton.getAll((photo: IPhoto) => {
                return a.photos.includes(photo.id);
            })
        );
    }

    getAlbumById(albumId: string): Promise<IAlbum> {
        return AlbumRepo.singleton.getById(albumId);
    }

    getPhotoById(photoId: string): Promise<IPhoto> {
        return PhotoRepo.singleton.getById(photoId);
    }

    addPhoto(photo: EntityParams<IPhoto>): Promise<IPhoto> {
        return PhotoRepo.singleton.save(photo);
    }

    addAlbum(album: EntityParams<IAlbum>): Promise<IAlbum> {
        return AlbumRepo.singleton.save(album);
    }

    deleteAlbum(albumId: string): Promise<void> {
        return AlbumRepo.singleton.delete(albumId);
    }

    deletePhoto(photoId: string): Promise<void> {
        return PhotoRepo.singleton.delete(photoId);
    }

    share(shareableEntity: IShareable): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    includePhotoInAlbum(photoId: string, albumId: string): Promise<IAlbum> {
        throw new Error("Method not implemented.");
    }

    static get singleton(): Service {
        if (!Service._singleton) Service._singleton = new Service();
        return Service._singleton;
    }
}
