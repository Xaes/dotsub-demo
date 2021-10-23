import { RootState, GenericState } from ".";
import defaultMatchers from "./defaultMatchers";
import { Service } from "../../service/service";
import { EntityParams, IPhoto, IPhotoData } from "@dotsub-demo/common/common";
import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

export interface AddPhotoParms {
    photo: Omit<EntityParams<IPhoto>, "dataId">;
    photoData: EntityParams<IPhotoData>;
}

export const addPhoto = createAsyncThunk<IPhoto, AddPhotoParms>(
    "Photo/AddPhoto",
    async ({ photo, photoData }) => Service.singleton.addPhoto(photo, photoData)
);

export const fetchPhotosByAlbum = createAsyncThunk<IPhoto[], string>("Photo/FetchPhotos", async (albumId) =>
    Service.singleton.getPhotosByAlbum(albumId)
);

export const fetchPhotos = createAsyncThunk<IPhoto[]>("Photo/FetchPhotosByAlbum", async () =>
    Service.singleton.getAllPhotos()
);

export const fetchPhoto = createAsyncThunk<IPhoto, string>(
    "Photo/FetchPhoto",
    async (id: string) => Service.singleton.getPhotoById(id)
);

export const deletePhoto = createAsyncThunk<string, string>(
    "Photos/DeletePhoto",
    async (id) => {
        await Service.singleton.deletePhoto(id);
        return id;
    }
);

export const PhotoAdaper = createEntityAdapter<IPhoto>({
    selectId: (model) => model.id,
});

export const PhotoInitialState = PhotoAdaper.getInitialState<GenericState<IPhoto>>({
    status: "initialized",
});

export const PhotoSlice = createSlice({
    name: "Photo",
    initialState: PhotoInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addPhoto.fulfilled, (state, { payload }) => {
            PhotoAdaper.addOne(state, payload);
            state.status = "finished";
        });
        builder.addCase(fetchPhotos.fulfilled, (state, { payload }) => {
            PhotoAdaper.addMany(state, payload);
            state.status = "finished";
        });
        builder.addCase(fetchPhotosByAlbum.fulfilled, (state, { payload }) => {
            PhotoAdaper.addMany(state, payload);
            state.status = "finished";
        });
        builder.addCase(fetchPhoto.fulfilled, (state, { payload }) => {
            PhotoAdaper.addOne(state, payload);
            state.selectedEntity = payload.id;
            state.status = "finished";
        });
        builder.addCase(deletePhoto.fulfilled, (state, { payload }) => {
            PhotoAdaper.removeOne(state, payload);
            state.status = "finished";
        });
        defaultMatchers(builder);
    },
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } =
    PhotoAdaper.getSelectors<RootState>((state) => state.Photo);

export const selectPhotosByAlbum = createSelector(
    selectAll,
    ({ Album }: RootState) => Album.selectedEntity ? Album.entities[Album.selectedEntity] : undefined,
    (photos, album) => album ? photos.filter(p => album.photoIds.includes(p.id)) : undefined
);

export default PhotoSlice.reducer;
