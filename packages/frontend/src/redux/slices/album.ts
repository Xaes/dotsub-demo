import { RootState, GenericState } from ".";
import { StateStatus } from "./state-status";
import { Service } from "../../service/service";
import { EntityParams, IAlbum } from "@dotsub-demo/common/common";
import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
    isAnyOf,
} from "@reduxjs/toolkit";
import { deletePhoto } from "./photo";

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
    IAlbum,
    {
        albumId: string;
        emails: string[];
    }
>("Album/ShareAlbum", async ({ albumId, emails }) =>
    Service.singleton.shareAlbum(albumId, emails)
);

export const AlbumAdapter = createEntityAdapter<IAlbum>({
    selectId: (model) => model.id,
});

export const AlbumInitalState = AlbumAdapter.getInitialState<GenericState>({
    status: StateStatus.INITIALIZED,
});

export const AlbumSlice = createSlice({
    name: "Album",
    initialState: AlbumInitalState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAlbum.fulfilled, (state, { payload }) => {
                AlbumAdapter.addOne(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
                AlbumAdapter.addMany(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(fetchAlbum.fulfilled, (state, { payload }) => {
                AlbumAdapter.addOne(state, payload);
                state.selectedEntity = payload.id;
                state.status = StateStatus.FINISHED;
            })
            .addCase(deleteAlbum.fulfilled, (state, { payload }) => {
                AlbumAdapter.removeOne(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(deletePhoto.fulfilled, (state, { payload }) => {
                const { albums } = payload;
                AlbumAdapter.upsertMany(state, albums);
                state.status = StateStatus.FINISHED;
            })
            .addCase(addPhotosToAlbum.fulfilled, (state, { payload }) => {
                AlbumAdapter.upsertOne(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addCase(shareAlbum.fulfilled, (state, { payload }) => {
                AlbumAdapter.upsertOne(state, payload);
                state.status = StateStatus.FINISHED;
            })
            .addMatcher(
                isAnyOf(
                    fetchAlbum.pending,
                    fetchAlbums.pending,
                    fetchAlbum.pending,
                    deleteAlbum.pending,
                    addPhotosToAlbum.pending,
                    shareAlbum.pending
                ),
                (state) => {
                    state.status = StateStatus.LOADING;
                }
            )
            .addMatcher(
                isAnyOf(
                    fetchAlbum.rejected,
                    fetchAlbums.rejected,
                    fetchAlbum.rejected,
                    deleteAlbum.rejected
                ),
                (state) => {
                    state.status = StateStatus.ERROR;
                }
            );
    },
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } =
    AlbumAdapter.getSelectors<RootState>((state) => state.Album);

export default AlbumSlice.reducer;
