import Config from "../../config";
import NotFound from "../not-found";
import { RootState } from "../../redux/slices";
import Loading from "../../components/loading";
import { AppDispatch } from "../../redux/store";
import ShareList from "../../components/share-list";
import ImageList from "../../components/image-list";
import { useParams, useHistory } from "react-router";
import PageHeader from "../../components/page-header";
import { selectById } from "../../redux/slices/album";
import { useSelector, useDispatch } from "react-redux";
import React, { FC, useEffect, useState } from "react";
import SelectPhotos from "../../components/select-photos";
import TrashIcon from "@heroicons/react/outline/TrashIcon";
import { StateStatus } from "../../redux/slices/state-status";
import { selectPhotosByAlbum } from "../../redux/slices/photo";
import { fetchPhotosByAlbum } from "../../redux/actions/photo";
import {
    addPhotosToAlbum,
    shareAlbum,
    deleteAlbum,
    fetchAlbum,
    unshareAlbum,
} from "../../redux/actions/album";
import { cancelablePromise } from "../../utils";

const Album: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>();
    const { albumId } = useParams<{ albumId: string }>();
    const [displayNotFound, setDisplayNotFound] = useState<boolean>(false);
    const album = useSelector((state: RootState) => selectById(state, albumId));
    const photos = useSelector(selectPhotosByAlbum);
    const [albumStatus, photosStatus] = useSelector((state: RootState) => [
        state.Album.status,
        state.Photo.status,
    ]);

    useEffect(() => {
        const controller = new AbortController();
        cancelablePromise(async () => {
            await dispatch(fetchAlbum(albumId));
            await dispatch(fetchPhotosByAlbum(albumId));
        }, controller.signal)();
        setDisplayNotFound(true);
        return () => controller.abort();
    }, [albumId, album]);

    const onClickDelete = async () => {
        await dispatch(deleteAlbum(albumId)).unwrap();
        history.push(Config.LINKS.EXPLORE_BY_ALBUM);
    };

    const onShareAdd = async (emails: string[]) => {
        dispatch(shareAlbum({ emails, albumId }));
    };

    const onShareDelete = async (emails: string[]) => {
        dispatch(unshareAlbum({ emails, albumId }));
    };

    return (
        <section data-testid="album-section">
            {album ? (
                <React.Fragment>
                    <PageHeader
                        title={`Album: ${album?.name}`}
                        subtitle="Browse pictures"
                    />
                    <div className="flex justify-between items-center mb-8 lg:mb-16">
                        <div className="flex items-center capitalize lg:normal-case">
                            <p className="text-black dark:text-white text-lg lg:text-xl hidden lg:inline-block mr-3 font-medium">
                                A collection of
                            </p>
                            <p className="text-white bg-primary text-md w-9 h-9 rounded-full inline-flex items-center justify-center">
                                {album.photoIds.length}
                            </p>
                            <p className="text-black dark:text-white ml-3 text-lg lg:text-xl font-medium">
                                photo
                            </p>
                        </div>
                        <button
                            type="button"
                            role="button"
                            className="rounded-button danger"
                            onClick={onClickDelete}
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-12 gap-0 lg:gap-12">
                        <div className="col-span-12 lg:col-span-9">
                            <ImageList
                                photos={photos}
                                loading={photosStatus === StateStatus.LOADING}
                            />
                        </div>
                        <div className="col-span-12 lg:col-span-3 space-y-16 mt-16 lg:mt-0">
                            <SelectPhotos
                                onSelect={(selectedIds) => {
                                    dispatch(
                                        addPhotosToAlbum({
                                            photoIds: selectedIds,
                                            albumId: albumId,
                                        })
                                    );
                                }}
                            />
                            <ShareList
                                sharedWith={album.sharedWith}
                                onShareAdd={onShareAdd}
                                onShareDelete={onShareDelete}
                            />
                        </div>
                    </div>
                </React.Fragment>
            ) : albumStatus === StateStatus.LOADING || !displayNotFound ? (
                <Loading loading={true} />
            ) : (
                <NotFound />
            )}
        </section>
    );
};

Album.displayName = "Album";
export default Album;
