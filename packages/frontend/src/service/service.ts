import AlbumRepo from "./album-repo";
import PhotoRepo from "./photo-repo";
import {
    EntityParams,
    IAlbum,
    IPhoto,
    IPhotoData,
    IService,
    IShareable,
} from "@dotsub-demo/common/common";
import PhotoDataRepo from "./photo-data-repo";

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
                return a.photoIds.includes(photo.id);
            })
        );
    }

    getAlbumById(albumId: string): Promise<IAlbum> {
        return AlbumRepo.singleton.getById(albumId);
    }

    getPhotoById(photoId: string): Promise<IPhoto> {
        return PhotoRepo.singleton.getById(photoId);
    }

    async addPhoto(
        photo: Omit<EntityParams<IPhoto>, "dataId">,
        data: EntityParams<IPhotoData>
    ): Promise<IPhoto> {
        const { id: photoDataId } = await PhotoDataRepo.singleton.save(data);
        return PhotoRepo.singleton.save({
            ...photo,
            dataId: photoDataId,
        });
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

    async downloadImage(photoDataId: string): Promise<string> {
        const photoData = await PhotoDataRepo.singleton.getById(photoDataId);
        return photoData.data;
    }

    static get singleton(): Service {
        if (!Service._singleton) Service._singleton = new Service();
        return Service._singleton;
    }
}
