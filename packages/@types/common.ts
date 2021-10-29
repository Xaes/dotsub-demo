export interface IBaseEntity {
    id: string
    createdAt: string
}

export interface IShareable { 
    sharedWith?: string[]
}

export interface IPhoto extends IBaseEntity, IShareable {
    dataId: string;
    name: string;
    extension: string;
    size: number;
    tag?: string;
}

export interface IPhotoData extends IBaseEntity {
    data: string
}

export interface IAlbum extends IBaseEntity, IShareable {
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
    update(entity: T): Promise<T>;
}

export interface IService {
    getAllAlbums(filter?: Filter<IAlbum>): Promise<IAlbum[]>;
    getAllPhotos(filter?: Filter<IPhoto>): Promise<IPhoto[]>;
    getPhotosByAlbum(albumId: string): Promise<IPhoto[]>;
    getAlbumsByPhoto(photoId: string): Promise<IAlbum[]>;
    getAlbumById(albumId: string): Promise<IAlbum>;
    getPhotoById(photoId: string): Promise<IPhoto>;
    addPhoto(photo: Omit<EntityParams<IPhoto>, "dataId">, data: EntityParams<IPhotoData>): Promise<IPhoto>;
    addAlbum(album: EntityParams<IAlbum>): Promise<IAlbum>;
    shareAlbum(albumId: string, emails: string[]): Promise<{
        album: IAlbum,
        photos: Record<string, Pick<IPhoto, "id" | "sharedWith">>
    }>;
    unshareAlbum(albumId: string, emails: string[]): Promise<{
        album: IAlbum,
        photos: Record<string, Pick<IPhoto, "id" | "sharedWith">>
    }>;
    sharePhoto(photoId: string, emails: string[]): Promise<IPhoto>;
    unsharePhoto(photoId: string, emails: string[]): Promise<IPhoto>;
    includePhotosInAlbum(photosId: string[], albumId: string): Promise<IAlbum>
    deleteAlbum(albumId: string): Promise<void>;
    deletePhoto(photoId: string): Promise<{ 
        albums: IAlbum[]
        photoId: string
    }>;
    downloadImage(photoDataId: string): Promise<string>
}