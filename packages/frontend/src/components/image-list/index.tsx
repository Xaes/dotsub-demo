import Card from "../album-card";
import Empty from "../empty";
import Config from "../../config";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPhotos, selectAll } from "../../redux/slices/photo";
import ImageCard from "../image-card";

const ImageList: FC = () => {
    const images = useSelector(selectAll);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPhotos());
    }, []);

    const imageItems = images.map((image) => <ImageCard key={image.id} {...image} />);

    return images.length > 0 ? (
        <div className="grid grid-cols-3 gap-8">{imageItems}</div>
    ) : (
        <Empty>
            <Link to={Config.LINKS.NEW_ALBUM} className="primary-button">
                Create Album
            </Link>
        </Empty>
    );
};

ImageList.displayName = "AlbumList";
export default ImageList;
