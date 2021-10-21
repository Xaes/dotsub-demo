export interface IBaseEntity {
    id: string
    createdAt: Date
}

export interface IShareable { 
    sharedWith?: string[]
    shareWith(email: string): Promise<string[]>
}

export interface IPhoto extends IBaseEntity, IShareable {
    url: string
    tag: string
}

export interface IAlbum extends IBaseEntity, IShareable {
    name: string,
    photos: Pick<IPhoto, "id">[]
}

export interface IService {
    getAllAlbums(): Promise<IAlbum[]>;
    getAllPhotos(): Promise<IPhoto[]>;
    getPhotosByAlbum(albumId: Pick<IAlbum, "id">): Promise<IPhoto[]>;
    getAlbumById(albumId: Pick<IAlbum, "id">): Promise<IAlbum>;
    getPhotoById(photoId: Pick<IPhoto, "id">): Promise<IPhoto>;
    addPhoto(photo: IPhoto): Promise<IPhoto>;
    addAlbum(albumId: Pick<IAlbum, "id">): Promise<IAlbum>;
    share(shareableEntity: IShareable): Promise<string[]>;
    includePhotoInAlbum(photoId: Pick<IPhoto, "id">, albumId: Pick<IAlbum, "id">);
}