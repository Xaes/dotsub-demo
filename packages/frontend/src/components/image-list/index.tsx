import Empty from "../empty";
import Loading from "../loading";
import Config from "../../config";
import ImageCard from "../image-card";
import { Link } from "react-router-dom";
import { IPhoto } from "@dotsub-demo/common/common";
import React, { FC, useState, useEffect } from "react";

const ImageList: FC<{
    photos?: IPhoto[];
    loading: boolean;
    gridClassName?: string;
}> = ({ photos, loading, gridClassName }) => {
    const [displayEmpty, setDisplayEmpty] = useState<boolean>(false);
    const photoItems = photos?.map((image) => <ImageCard key={image.id} {...image} />);

    useEffect(() => {
        if (loading) setDisplayEmpty(true);
    }, [loading]);

    if (loading || !displayEmpty) return <Loading loading={true} />;
    else if (photos && photos.length > 0)
        return (
            <div className={`grid ${gridClassName || "grid-cols-3"} gap-8`}>
                {photoItems}
            </div>
        );
    else
        return (
            <Empty>
                <Link to={Config.LINKS.NEW_ALBUM} className="button primary-button">
                    Create Album
                </Link>
            </Empty>
        );
};

ImageList.displayName = "AlbumList";
export default ImageList;
