import ImageHolder from "../image-holder";
import { Service } from "../../service/service";
import { IPhoto } from "@dotsub-demo/common/common";
import React, { FC, useState, useEffect } from "react";
import CheckIcon from "@heroicons/react/outline/CheckIcon";
import { cancelablePromise } from "../../utils";

const SelectItem: FC<{
    photo: IPhoto;
    isSelected: boolean;
    onSelect: () => void;
}> = ({ photo, isSelected, onSelect }) => {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        const controller = new AbortController();
        cancelablePromise(async () => {
            const data = await Service.singleton.downloadImage(photo.dataId);
            setImage(data);
        }, controller.signal)();
        return () => controller.abort();
    }, [photo]);

    return (
        <button
            type="button"
            key={photo.id}
            className="flex group w-full items-center space-x-4"
            onClick={onSelect}
            role="button"
        >
            <div
                className="h-32 flex-full xl:flex-grow relative rounded-md overflow-hidden xl:h-20 shadow-md group-hover:shadow-2xl transition-all"
                style={{ flex: "1 0 30%" }}
            >
                <ImageHolder image={image} alt={photo.name} />
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-all ${
                        isSelected ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="rounded-button select-none pointer-events-none">
                        <CheckIcon className="h-5 w-5" />
                    </div>
                </div>
            </div>
            <div
                className="text-left block lg:hidden xl:block"
                style={{ flex: "1 0 70%" }}
            >
                <p
                    className={`text-sm transition-colors ${
                        isSelected ? "text-primary" : "text-gray-500"
                    }`}
                >
                    {photo.name}
                </p>
            </div>
        </button>
    );
};

SelectItem.displayName = "SelectItem";
export default SelectItem;
