import Config from "../../config";
import { Link } from "react-router-dom";
import { Service } from "../../service/service";
import { IPhoto } from "@dotsub-demo/common/common";
import React, { FC, useEffect, useState } from "react";
import ImageHolder from "../image-holder";

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
            to={Config.LINKS.IMAGE.replace(":photoId", id)}
            className={`flex flex-col shadow-md rounded-2xl overflow-hidden hover:shadow-2xl bg-white-1 dark:bg-black-2 dark:hover:bg-transparent`}
        >
            <div className="w-full h-64">
                <ImageHolder alt={`${name} - ${tag}`} image={image} />
            </div>
            <div className="p-8 border flex-grow flex flex-col justify-center border-white-1 dark:border-black-2 rounded-b-2xl">
                <h6 className="text-black dark:text-white leading-none">{name}</h6>
                <time
                    dateTime={createdAt}
                    className="text-gray-500 font-normal text-xs leading-none mt-2"
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
