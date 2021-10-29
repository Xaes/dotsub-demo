import { Service } from "../../service/service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EntityParams, IAlbum, IPhoto, IPhotoData } from "@dotsub-demo/common/common";

export interface AddPhotoParms {
    photo: Omit<EntityParams<IPhoto>, "dataId">;
    photoData: EntityParams<IPhotoData>;
}

export const addPhoto = createAsyncThunk<IPhoto, AddPhotoParms>(
    "Photo/AddPhoto",
    async ({ photo, photoData }) => Service.singleton.addPhoto(photo, photoData)
);

export const fetchPhotosByAlbum = createAsyncThunk<IPhoto[], string>(
    "Photo/FetchPhotos",
    async (albumId) => Service.singleton.getPhotosByAlbum(albumId)
);

export const fetchPhotos = createAsyncThunk<IPhoto[]>(
    "Photo/FetchPhotosByAlbum",
    async () => Service.singleton.getAllPhotos()
);

export const fetchPhoto = createAsyncThunk<IPhoto, string>(
    "Photo/FetchPhoto",
    async (id: string) => Service.singleton.getPhotoById(id)
);

export const sharePhoto = createAsyncThunk<
    IPhoto,
    {
        photoId: string;
        emails: string[];
    }
>("Album/SharePhoto", async ({ photoId, emails }) =>
    Service.singleton.sharePhoto(photoId, emails)
);

export const unsharePhoto = createAsyncThunk<
    IPhoto,
    {
        photoId: string;
        emails: string[];
    }
>("Album/UnsharePhoto", async ({ photoId, emails }) =>
    Service.singleton.unsharePhoto(photoId, emails)
);

export const deletePhoto = createAsyncThunk<
    {
        albums: IAlbum[];
        photoId: string;
    },
    string
>("Photos/DeletePhoto", async (id: string) => Service.singleton.deletePhoto(id));
