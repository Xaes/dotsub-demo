import AlbumRepo from "./album-repo";
import PhotoRepo from "./photo-repo";
import {
    EntityParams,
    IAlbum,
    IPhoto,
    IPhotoData,
    IService,
    Filter,
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
        return AlbumRepo.singleton.getAll((album) => album.photoIds.includes(photoId));
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
        albums: IAlbum[];
        photoId: string;
    }> {
        const albums = await this.getAlbumsByPhoto(photoId);
        const updatedAlbums = await Promise.all(
            albums.map((album) =>
                AlbumRepo.singleton.update({
                    ...album,
                    photoIds: album.photoIds.filter((id) => id !== photoId),
                })
            )
        );
        await PhotoRepo.singleton.delete(photoId);
        return { albums: updatedAlbums, photoId };
    }

    async shareAlbum(
        albumId: string,
        emails: string[]
    ): Promise<{
        album: IAlbum;
        photos: Record<string, Pick<IPhoto, "id" | "sharedWith">>;
    }> {
        const album = await AlbumRepo.singleton.getById(albumId);
        const albumPhotos = await this.getPhotosByAlbum(albumId);
        const shareList = album.sharedWith ? Array.from(album.sharedWith) : [];

        emails.forEach((email) => {
            if (!shareList.includes(email)) shareList.push(email);
        });

        const updatedPhotos = await Promise.all(
            albumPhotos.map((photo) => this.sharePhoto(photo.id, emails))
        );
        const updatedAlbum = await AlbumRepo.singleton.update({
            ...album,
            sharedWith: shareList,
        });

        return {
            album: updatedAlbum,
            photos: updatedPhotos.reduce(
                (obj, photo) => ({
                    ...obj,
                    [photo.id]: {
                        id: photo.id,
                        sharedWith: photo.sharedWith,
                    },
                }),
                {}
            ),
        };
    }

    async sharePhoto(photoId: string, emails: string[]): Promise<IPhoto> {
        const photo = await PhotoRepo.singleton.getById(photoId);
        const shareList = photo.sharedWith ? Array.from(photo.sharedWith) : [];

        emails.forEach((email) => {
            if (!shareList.includes(email)) shareList.push(email);
        });

        return PhotoRepo.singleton.update({
            ...photo,
            sharedWith: shareList,
        });
    }

    async unsharePhoto(photoId: string, emails: string[]): Promise<IPhoto> {
        const photo = await PhotoRepo.singleton.getById(photoId);

        return PhotoRepo.singleton.update({
            ...photo,
            sharedWith: photo.sharedWith?.filter((share) => !emails.includes(share)),
        });
    }

    async unshareAlbum(
        albumId: string,
        emails: string[]
    ): Promise<{
        album: IAlbum;
        photos: Record<string, Pick<IPhoto, "id" | "sharedWith">>;
    }> {
        const album = await AlbumRepo.singleton.getById(albumId);
        const albumPhotos = await this.getPhotosByAlbum(albumId);

        const updatedPhotos = await Promise.all(
            albumPhotos.map((photo) => this.unsharePhoto(photo.id, emails))
        );

        const updatedAlbum = await AlbumRepo.singleton.update({
            ...album,
            sharedWith: album.sharedWith?.filter((share) => !emails.includes(share)),
        });

        return {
            album: updatedAlbum,
            photos: updatedPhotos.reduce(
                (obj, photo) => ({
                    ...obj,
                    [photo.id]: {
                        id: photo.id,
                        sharedWith: photo.sharedWith,
                    },
                }),
                {}
            ),
        };
    }

    async includePhotosInAlbum(photosId: string[], albumId: string): Promise<IAlbum> {
        const album = await AlbumRepo.singleton.getById(albumId);
        photosId.forEach((id) => {
            if (!album.photoIds.includes(id)) album.photoIds.push(id);
        });
        return AlbumRepo.singleton.update(album);
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
