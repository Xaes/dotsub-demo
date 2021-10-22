import Config from "../../config";
import { Link } from "react-router-dom";
import { IPhoto } from "@dotsub-demo/common/common";
import React, { FC, useEffect, useState } from "react";
import { Service } from "../../service/service";

const ImageCard: FC<IPhoto> = ({ tag, dataId, id, name, createdAt }) => {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        const fetchImage = async () => {
            const data = await Service.singleton.downloadImage(dataId);
            setImage(data);
        };

        fetchImage();
    }, [dataId]);

    return (
        <Link
            to={Config.LINKS.IMAGE.replace(":imageId", id)}
            className={`shadow-md hover:shadow-2xl overflow-hidden rounded-md bg-white-1 dark:bg-black-2 border border-white-1 dark:border-black-2 dark:hover:bg-transparent}`}
        >
            <div className="w-full h-64">
                <img src={`${image}`} alt={`${name} - ${tag}`} className="object-cover w-full h-full" />
            </div>
            <div className="p-8">
                <h6 className="text-black dark:text-white leading-none">{name}</h6>
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

ImageCard.displayName = "ImageCard";
export default ImageCard;
