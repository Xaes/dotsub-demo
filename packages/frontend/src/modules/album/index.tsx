import Config from "../../config";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Empty from "../../components/empty";
import React, { FC, useEffect } from "react";
import { RootState } from "../../redux/slices";
import ImageCard from "../../components/image-card";
import PageHeader from "../../components/page-header";
import { selectById } from "../../redux/slices/album";
import { useSelector, useDispatch } from "react-redux";
import TrashIcon from "@heroicons/react/outline/TrashIcon";
import { fetchAlbum, deleteAlbum } from "../../redux/slices/album";
import { fetchPhotosByAlbum, selectPhotosByAlbum } from "../../redux/slices/photo";

const Album: FC = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams<{ albumId: string }>();
    const album = useSelector((state: RootState) => selectById(state, albumId));
    const photos = useSelector(selectPhotosByAlbum);

    useEffect(() => {
        dispatch(fetchAlbum(albumId));
        dispatch(fetchPhotosByAlbum(albumId));
    }, [albumId, album]);

    const photosItems = photos?.map((image) => <ImageCard key={image.id} {...image} />);

    return (
        <section data-testid="album-section">
            <PageHeader title={`Album: ${album?.name}`} subtitle="Browse pictures" />
            <div className="flex justify-between items-center mb-16">
                <h6 className="text-black dark:text-white font-medium">
                    A collection of
                    <span className="text-white bg-primary mx-3 text-md w-9 h-9 rounded-full inline-flex items-center justify-center">{album?.photoIds.length || 0}</span>
                    photos
                 </h6>
                <button
                    type="button"
                    role="button"
                    className="rounded-button danger"
                    onClick={() => dispatch(deleteAlbum(albumId))}
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
            {photosItems && photosItems.length > 0 ? (
                <div className="grid grid-cols-4 gap-8">{photosItems}</div>
            ) : (
                <Empty>
                    <Link to={Config.LINKS.NEW_ALBUM} className="primary-button">
                        Create Album
                    </Link>
                </Empty>
            )}
        </section>
    );
};

Album.displayName = "Album";
export default Album;
