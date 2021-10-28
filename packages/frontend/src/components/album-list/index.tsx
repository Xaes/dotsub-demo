import Empty from "../empty";
import Loading from "../loading";
import Config from "../../config";
import AlbumCard from "../album-card";
import { Link } from "react-router-dom";
import { IAlbum } from "@dotsub-demo/common/common";
import React, { FC, useEffect, useState } from "react";

const AlbumList: FC<{
    albums?: IAlbum[];
    loading: boolean;
    gridClassName?: string;
}> = ({ albums, loading, gridClassName }) => {
    const [displayEmpty, setDisplayEmpty] = useState<boolean>(false);
    const albumItems = albums?.map((album) => <AlbumCard key={album.id} {...album} />);

    useEffect(() => {
        if (loading) setDisplayEmpty(true);
    }, [loading]);

    if (loading || !displayEmpty) return <Loading loading={true} />;
    else if (albums && albums.length > 0)
        return <div className={`grid ${gridClassName || "grid-cols-3"} gap-8`}>{albumItems}</div>; 
    else
        return (
            <Empty>
                <Link to={Config.LINKS.NEW_ALBUM} className="button primary-button">
                    Create Album
                </Link>
            </Empty>
        );
};

AlbumList.displayName = "AlbumList";
export default AlbumList;
