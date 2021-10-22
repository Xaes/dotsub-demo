import { RootState, GenericState } from ".";
import { Service } from "../../service/service";
import { EntityParams, IPhoto, IPhotoData } from "@dotsub-demo/common/common";
import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";

export const addPhoto = createAsyncThunk<
    IPhoto,
    {
        photo: Omit<EntityParams<IPhoto>, "dataId">;
        photoData: EntityParams<IPhotoData>;
    }
>("Photo/AddPhoto", async ({ photo, photoData }) =>
    Service.singleton.addPhoto(photo, photoData)
);

export const fetchPhotos = createAsyncThunk<IPhoto[]>("Photo/FetchPhotos", async () =>
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

export const PhotoInitialState = PhotoAdaper.getInitialState<GenericState>({
    status: "initialized",
});

export const PhotoSlice = createSlice({
    name: "Album",
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
        builder.addCase(fetchPhoto.fulfilled, (state, { payload }) => {
            PhotoAdaper.addOne(state, payload);
            state.status = "finished";
        });
        builder.addCase(deletePhoto.fulfilled, (state, { payload }) => {
            PhotoAdaper.removeOne(state, payload);
            state.status = "finished";
        });
    },
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } =
    PhotoAdaper.getSelectors<RootState>((state) => state.Photo);

export default PhotoSlice.reducer;
