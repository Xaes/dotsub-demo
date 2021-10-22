import { useParams } from "react-router";
import React, { FC, useEffect } from "react";
import { RootState } from "../../redux/slices";
import PageHeader from "../../components/page-header";
import { selectById } from "../../redux/slices/album";
import { useSelector, useDispatch } from "react-redux";
import TrashIcon from "@heroicons/react/outline/TrashIcon";
import { fetchAlbum, deleteAlbum } from "../../redux/slices/album";

const Album: FC = () => {
    const { albumId } = useParams<{ albumId: string }>();
    const dispatch = useDispatch();
    const album = useSelector((state: RootState) => selectById(state, albumId));

    useEffect(() => {
        dispatch(fetchAlbum(albumId));
    });

    return (
        <section data-testid="album-section">
            <PageHeader title={`Album: ${album?.name}`} subtitle="Browse pictures" />
            <div className="flex justify-end">
                <button
                    type="button"
                    role="button"
                    className="rounded-button danger"
                    onClick={() => dispatch(deleteAlbum(albumId))}
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
        </section>
    );
};

Album.displayName = "Album";
export default Album;
