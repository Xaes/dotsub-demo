import { Service } from "../../service/service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EntityParams, IAlbum, IPhoto } from "@dotsub-demo/common/common";

export const addAlbum = createAsyncThunk<IAlbum, EntityParams<IAlbum>>(
    "Album/AddAlbum",
    async (album) => Service.singleton.addAlbum(album)
);

export const addPhotosToAlbum = createAsyncThunk<
    IAlbum,
    {
        photoIds: string[];
        albumId: string;
    }
>("Album/AddPhotosToAlbum", async ({ photoIds, albumId }) =>
    Service.singleton.includePhotosInAlbum(photoIds, albumId)
);

export const fetchAlbums = createAsyncThunk<IAlbum[]>("Albums/FetchAlbum", async () =>
    Service.singleton.getAllAlbums()
);

export const fetchAlbum = createAsyncThunk<IAlbum, string>(
    "Album/FetchAlbum",
    async (id: string) => Service.singleton.getAlbumById(id)
);

export const deleteAlbum = createAsyncThunk<string, string>(
    "Album/DeleteAlbum",
    async (albumId) => {
        await Service.singleton.deleteAlbum(albumId);
        return albumId;
    }
);

export const shareAlbum = createAsyncThunk<
    {
        album: IAlbum;
        photos: Record<string, Pick<IPhoto, "id" | "sharedWith">>;
    },
    {
        albumId: string;
        emails: string[];
    }
>("Album/ShareAlbum", async ({ albumId, emails }) =>
    Service.singleton.shareAlbum(albumId, emails)
);

export const unshareAlbum = createAsyncThunk<
    {
        album: IAlbum;
        photos: Record<string, Pick<IPhoto, "id" | "sharedWith">>;
    },
    {
        albumId: string;
        emails: string[];
    }
>("Album/UnshareAlbum", async ({ albumId, emails }) =>
    Service.singleton.unshareAlbum(albumId, emails)
);
