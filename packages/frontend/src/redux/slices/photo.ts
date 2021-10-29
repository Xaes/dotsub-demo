import { RootState, GenericState } from ".";
import { StateStatus } from "./state-status";
import { IPhoto } from "@dotsub-demo/common/common";
import {
    createSlice,
    createEntityAdapter,
    createSelector,
    isAnyOf,
    EntityId,
} from "@reduxjs/toolkit";
import {
    addPhoto,
    fetchPhoto,
    fetchPhotos,
    deletePhoto,
    sharePhoto,
    unsharePhoto,
    fetchPhotosByAlbum,
} from "../actions/photo";
import { shareAlbum } from "../actions/album";

export const PhotoAdaper = createEntityAdapter<IPhoto>({
    selectId: (model) => model.id,
});

export const PhotoInitialState = PhotoAdaper.getInitialState<GenericState>({
    status: StateStatus.INITIALIZED,
});

export const PhotoSlice = createSlice({
    name: "Photo",
    initialState: PhotoInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPhoto.fulfilled, (state, { payload }) => {
                PhotoAdaper.addOne(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
                PhotoAdaper.addMany(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(fetchPhotosByAlbum.fulfilled, (state, { payload }) => {
                PhotoAdaper.addMany(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(fetchPhoto.fulfilled, (state, { payload }) => {
                PhotoAdaper.addOne(state, payload);
                state.selectedEntity = payload.id;
                state.status = StateStatus.FINISHED;
            })
            .addCase(deletePhoto.fulfilled, (state, { payload }) => {
                PhotoAdaper.removeOne(state, payload.photoId);
                state.status = StateStatus.FINISHED;
            })
            .addCase(sharePhoto.fulfilled, (state, { payload }) => {
                PhotoAdaper.upsertOne(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(unsharePhoto.fulfilled, (state, { payload }) => {
                PhotoAdaper.upsertOne(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(shareAlbum.fulfilled, (state, { payload }) => {
                PhotoAdaper.upsertMany(state, payload.photos as Record<EntityId, IPhoto>);
                state.status = StateStatus.FINISHED;
            })
            .addMatcher(
                isAnyOf(
                    addPhoto.pending,
                    fetchPhotos.pending,
                    fetchPhotosByAlbum.pending,
                    fetchPhoto.pending,
                    deletePhoto.pending,
                    sharePhoto.pending,
                    unsharePhoto.pending
                ),
                (state) => {
                    state.status = StateStatus.LOADING;
                }
            )
            .addMatcher(
                isAnyOf(
                    addPhoto.rejected,
                    fetchPhotos.rejected,
                    fetchPhotosByAlbum.rejected,
                    fetchPhoto.rejected,
                    deletePhoto.rejected,
                    sharePhoto.pending,
                    unsharePhoto.pending
                ),
                (state) => {
                    state.status = StateStatus.ERROR;
                }
            );
    },
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } =
    PhotoAdaper.getSelectors<RootState>((state) => state.Photo);

export const selectPhotosByAlbum = createSelector(
    selectAll,
    ({ Album }: RootState) =>
        Album.selectedEntity ? Album.entities[Album.selectedEntity] : undefined,
    (photos, album) =>
        album ? photos.filter((p) => album.photoIds.includes(p.id)) : undefined
);

export const selectPhotosNotInAlbum = createSelector(
    selectAll,
    ({ Album }: RootState) =>
        Album.selectedEntity ? Album.entities[Album.selectedEntity] : undefined,
    (photos, album) =>
        album ? photos.filter((p) => !album.photoIds.includes(p.id)) : undefined
);

export default PhotoSlice.reducer;
