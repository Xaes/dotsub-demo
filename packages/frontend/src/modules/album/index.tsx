import Config from "../../config";
import NotFound from "../not-found";
import { RootState } from "../../redux/slices";
import Loading from "../../components/loading";
import ImageList from "../../components/image-list";
import { useParams, useHistory } from "react-router";
import PageHeader from "../../components/page-header";
import { selectById } from "../../redux/slices/album";
import { useSelector, useDispatch } from "react-redux";
import React, { FC, useEffect, useState } from "react";
import TrashIcon from "@heroicons/react/outline/TrashIcon";
import { StateStatus } from "../../redux/slices/state-status";
import { fetchAlbum, deleteAlbum } from "../../redux/slices/album";
import { fetchPhotosByAlbum, selectPhotosByAlbum } from "../../redux/slices/photo";
import { AppDispatch } from "../../redux/store";

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
        dispatch(fetchAlbum(albumId));
        dispatch(fetchPhotosByAlbum(albumId));
        setDisplayNotFound(true);
    }, [albumId, album]);

    const onClickDelete = async () => {
        await dispatch(deleteAlbum(albumId)).unwrap();
        history.push(Config.LINKS.EXPLORE_BY_ALBUM);
    }

    return (
        <section data-testid="album-section">
            {album ? (
                <React.Fragment>
                    <PageHeader
                        title={`Album: ${album?.name}`}
                        subtitle="Browse pictures"
                    />
                    <div className="flex justify-between items-center mb-16">
                        <h6 className="text-black dark:text-white font-medium">
                            A collection of
                            <span className="text-white bg-primary mx-3 text-md w-9 h-9 rounded-full inline-flex items-center justify-center">
                                {album.photoIds.length}
                            </span>
                            photos
                        </h6>
                        <button
                            type="button"
                            role="button"
                            className="rounded-button danger"
                            onClick={onClickDelete}
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <ImageList
                        gridClassName="grid-cols-4"
                        photos={photos}
                        loading={photosStatus === StateStatus.LOADING}
                    />
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
