import Card from "../card";
import Config from "../../config";
import { Service } from "../../service/service";
import { IAlbum } from "@dotsub-demo/common/common";
import React, { FC, useEffect, useState } from "react";

const AlbumList: FC = () => {
    const [albums, setAlbums] = useState<IAlbum[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const albums = await Service.singleton.getAllAlbums();
            setAlbums((prevState) => prevState.concat(albums));
        };

        fetch();
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
