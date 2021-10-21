export interface IBaseEntity {
    id: string
    createdAt: Date
}

export interface IShareable { 
    sharedWith?: string[]
    shareWith(email: string): Promise<string[]>
}

export interface IPhoto extends IBaseEntity, IShareable {
    data: string;
    tag: string;
}

export interface IAlbum extends IBaseEntity, IShareable {
    name: string,
    photos: string[]
}

export type Filter<T extends IBaseEntity> = (entity: T) => boolean;

export interface IRepository<T extends IBaseEntity> {
    save(entity: T): Promise<T>;
    getById(id: string): Promise<T>;
    getAll(filter?: Filter<T>): Promise<T[]>;
    delete(id: string): Promise<void>;
}

export interface IService {
    getAllAlbums(): Promise<IAlbum[]>;
    getAllPhotos(): Promise<IPhoto[]>;
    getPhotosByAlbum(albumId: string): Promise<IPhoto[]>;
    getAlbumById(albumId: string): Promise<IAlbum>;
    getPhotoById(photoId: string): Promise<IPhoto>;
    addPhoto(photo: IPhoto): Promise<IPhoto>;
    addAlbum(album: IAlbum): Promise<IAlbum>;
    share(shareableEntity: IShareable): Promise<string[]>;
    includePhotoInAlbum(photoId: string, albumId: string): Promise<IAlbum>
}