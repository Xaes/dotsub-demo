import Config from "../../config";
import { Link } from "react-router-dom";
import ImageHolder from "../image-holder";
import { Service } from "../../service/service";
import { cancelablePromise } from "../../utils";
import { IPhoto } from "@dotsub-demo/common/common";
import React, { FC, useEffect, useState } from "react";
import TagIcon from "@heroicons/react/outline/TagIcon";

const ImageCard: FC<IPhoto> = ({ tag, dataId, id, name, createdAt }) => {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        const controller = new AbortController();
        cancelablePromise(async () => {
            const data = await Service.singleton.downloadImage(dataId);
            setImage(data);
        }, controller.signal)();
        return () => controller.abort();
    }, [dataId]);

    return (
        <Link
            to={Config.LINKS.IMAGE.replace(":photoId", id)}
            className={`flex flex-col shadow-md rounded-2xl overflow-hidden hover:shadow-2xl bg-white-1 dark:bg-black-2 dark:hover:bg-transparent`}
        >
            <div className="w-full h-64 relative">
                {tag && (
                    <div className="px-2 sm:px-3 py-1 sm:py-1.5 absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center rounded-xl bg-primary">
                        <TagIcon className="h-3.5 w-3.5 mr-2 text-white" />
                        <span className="text-white text-xs font-bold">{tag}</span>
                    </div>
                )}
                <ImageHolder alt={`${name} - ${tag}`} image={image} />
            </div>
            <div className="p-4 sm:p-8 border flex-grow flex flex-col justify-center border-white-1 dark:border-black-2 rounded-b-2xl">
                <h6 className="text-sm sm:text-lg text-black dark:text-white leading-none sm:leading-none">
                    {name}
                </h6>
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
