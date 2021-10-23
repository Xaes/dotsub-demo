import AlbumCard from "../album-card";
import Empty from "../empty";
import Config from "../../config";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, selectAll } from "../../redux/slices/album";
import { Link } from "react-router-dom";

const AlbumList: FC = () => {
    const albums = useSelector(selectAll);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAlbums());
    }, []);

    const albumItems = albums.map((album) => <AlbumCard key={album.id} {...album} />);

    return albums.length > 0 ? (
        <div className="grid grid-cols-3 gap-8">{albumItems}</div>
    ) : (
        <Empty>
            <Link to={Config.LINKS.NEW_ALBUM} className="primary-button">
                Create Album
            </Link>
        </Empty>
    );
};

AlbumList.displayName = "AlbumList";
export default AlbumList;
