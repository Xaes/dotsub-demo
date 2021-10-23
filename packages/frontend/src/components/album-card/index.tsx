import Config from "../../config";
import { Link } from "react-router-dom";
import ImageHolder from "../image-holder";
import useImage from "../../hooks/useImage";
import React, { FC, useEffect } from "react";
import { RootState } from "../../redux/slices";
import { IAlbum } from "../../../../@types/common";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhoto, selectById } from "../../redux/slices/photo";
import PhotographIcon from "@heroicons/react/outline/PhotographIcon";

const Card: FC<IAlbum> = ({ id, name, createdAt, photoIds }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (photoIds[0]) {
            const fetch = async () => await dispatch(fetchPhoto(photoIds[0]));
            fetch();
        }
    }, []);

    const firstPhoto = useSelector((state: RootState) => selectById(state, photoIds[0]));
    const image = useImage(firstPhoto?.dataId);

    return (
        <Link
            className="relative group"
            to={Config.LINKS.ALBUM.replace(":albumId", id)}
        >
            <div className="px-3 py-1.5 absolute top-8 left-8 flex items-center rounded-xl bg-primary">
                <PhotographIcon className="h-4 w-4 mr-2 text-white" />
                <span className="text-white text-sm font-bold">{photoIds.length}</span>
            </div>
            <div className="w-full h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all">
                <ImageHolder image={image} alt={`${name} - Album`} />
            </div>
            <div className="p-8">
                <h6 className="transition-colors text-black dark:text-white leading-none group-hover:text-primary">{name}</h6>
                <time
                    dateTime={createdAt}
                    className="text-gray-500 font-normal text-xs leading-none"
                >
                    {new Date(createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    })}
                </time>
            </div>
        </Link>
    );
};

Card.displayName = "Card";
export default Card;
