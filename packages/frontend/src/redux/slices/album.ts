import { RootState, GenericState } from ".";
import { Service } from "../../service/service";
import defaultMatchers from "./defaultMatchers";
import { EntityParams, IAlbum } from "@dotsub-demo/common/common";
import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";

export const addAlbum = createAsyncThunk<IAlbum, EntityParams<IAlbum>>(
    "Album/AddAlbum",
    async (album) => Service.singleton.addAlbum(album)
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

export const AlbumAdapter = createEntityAdapter<IAlbum>({
    selectId: (model) => model.id,
});

export const AlbumInitalState = AlbumAdapter.getInitialState<GenericState>({
    status: "initialized",
});

export const AlbumSlice = createSlice({
    name: "Album",
    initialState: AlbumInitalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAlbum.fulfilled, (state, { payload }) => {
            AlbumAdapter.addOne(state, payload);
            state.status = "finished";
        });
        builder.addCase(fetchAlbums.fulfilled, (state, { payload }) => {
            AlbumAdapter.addMany(state, payload);
            state.status = "finished";
        });
        builder.addCase(fetchAlbum.fulfilled, (state, { payload }) => {
            AlbumAdapter.addOne(state, payload);
            state.status = "finished";
        });
        builder.addCase(deleteAlbum.fulfilled, (state, { payload }) => {
            AlbumAdapter.removeOne(state, payload);
            state.status = "finished";
        });
        defaultMatchers(builder);
    },
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } =
    AlbumAdapter.getSelectors<RootState>((state) => state.Album);

export default AlbumSlice.reducer;
