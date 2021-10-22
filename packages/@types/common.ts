export interface IBaseEntity {
    id: string
    createdAt: string
}

export interface IShareable { 
    sharedWith?: string[]
    shareWith(email: string): Promise<string[]>
}

export interface IPhoto extends IBaseEntity {
    dataId: string;
    name: string;
    extension: string;
    size: number;
    tag?: string;
}

export interface IPhotoData extends IBaseEntity {
    data: string
}

export interface IAlbum extends IBaseEntity {
    name: string,
    photoIds: string[]
}

export type Filter<T extends IBaseEntity> = (entity: T) => boolean;
export type EntityParams<T extends IBaseEntity> = Omit<T, "id" | "createdAt">;

export interface IRepository<T extends IBaseEntity> {
    save(entity: EntityParams<T>): Promise<T>;
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
    addPhoto(photo: Omit<EntityParams<IPhoto>, "dataId">, data: EntityParams<IPhotoData>): Promise<IPhoto>;
    addAlbum(album: EntityParams<IAlbum>): Promise<IAlbum>;
    share(shareableEntity: IShareable): Promise<string[]>;
    includePhotoInAlbum(photoId: string, albumId: string): Promise<IAlbum>
    deleteAlbum(albumId: string): Promise<void>;
    deletePhoto(photoId: string): Promise<void>;
    downloadImage(photoDataId: string): Promise<string>
}