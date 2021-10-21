import { RootState, GenericState } from ".";
import { Service } from "../../service/service";
import { EntityParams, IAlbum } from "@dotsub-demo/common/common";
import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";

export const addAlbum = createAsyncThunk<IAlbum, EntityParams<IAlbum>>(
    "Album/AddAlbum",
    async (album) => Service.singleton.addAlbum(album)
);

export const fetchAlbums = createAsyncThunk<IAlbum[]>("Album/FetchAlbum", async () =>
    Service.singleton.getAllAlbums()
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
    },
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } =
    AlbumAdapter.getSelectors<RootState>((state) => state.Album);

export default AlbumSlice.reducer;
