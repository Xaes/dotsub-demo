import AlbumRepo from "./album-repo";
import PhotoRepo from "./photo-repo";
import {
    EntityParams,
    IAlbum,
    IPhoto,
    IPhotoData,
    IService,
    IShareable,
    Filter
} from "@dotsub-demo/common/common";
import PhotoDataRepo from "./photo-data-repo";

export class Service implements IService {
    private static _singleton: IService;

    private constructor() {
        return;
    }

    getAllAlbums(filter?: Filter<IAlbum>): Promise<IAlbum[]> {
        return AlbumRepo.singleton.getAll(filter);
    }

    getAllPhotos(filter?: Filter<IPhoto>): Promise<IPhoto[]> {
        return PhotoRepo.singleton.getAll(filter);
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

    getAlbumsByPhoto(photoId: string): Promise<IAlbum[]> {
        return AlbumRepo.singleton.getAll(album => album.photoIds.includes(photoId));
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

    async deletePhoto(photoId: string): Promise<{ 
        albums: IAlbum[]
        photoId: string
    }> {
        const albums = await this.getAlbumsByPhoto(photoId);
        const updatedAlbums = await Promise.all(albums.map(album => AlbumRepo.singleton.update({
            ...album,
            photoIds: album.photoIds.filter(id => id !== photoId)
        })));
        await PhotoRepo.singleton.delete(photoId);
        return { albums: updatedAlbums, photoId };
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
