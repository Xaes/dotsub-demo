import Card from "../card";
import Config from "../../config";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, selectAll } from "../../redux/slices/album";

const AlbumList: FC = () => {
    const albums = useSelector(selectAll);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAlbums())
    }, []);

    const albumItems = albums.map((album) => (
        <Card
            key={album.id}
            title={album.name}
            time={album.createdAt}
            link={Config.LINKS.ALBUM.replace(":albumId", album.id)}
        />
    ));

    return <div className="grid grid-cols-3 gap-8">{albumItems}</div>;
};

AlbumList.displayName = "AlbumList";
export default AlbumList;
