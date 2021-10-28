import React, { FC, useEffect, useState } from "react";
import TagIcon from "@heroicons/react/outline/TagIcon";
import TrashIcon from "@heroicons/react/outline/TrashIcon";

const UploadThumb: FC<{
    index: number;
    photo: { id: string; data: string };
    onFileDelete?: (index: number) => void;
    onTagAdd: (photoId: string, tag?: string) => void;
}> = ({ photo, onFileDelete, onTagAdd, index }) => {
    const [editable, setEditable] = useState<boolean>(false);
    const [tag, setTag] = useState<string>("");

    useEffect(() => {
        if (tag && tag.length > 0) onTagAdd(photo.id, tag);
        else onTagAdd(photo.id, undefined);
    }, [tag]);

    return (
        <div className="relative">
            <img src={photo.data} className="w-full h-64 object-cover rounded-2xl" />
            {onFileDelete && (
                <button
                    type="button"
                    className="absolute top-4 right-4 rounded-button danger"
                    onClick={() => onFileDelete(index)}
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            )}
            <div className="absolute bottom-4 left-4 right-4 flex items-center">
                <button
                    type="button"
                    className="rounded-button mr-2"
                    style={{ flex: "1 0 auto" }}
                    onClick={() => setEditable((prevState) => !prevState)}
                >
                    <TagIcon className="h-5 w-5" />
                </button>
                <input
                    type="text"
                    className={`text-gray-500 w-full px-4 h-10 font-medium rounded-2xl border outline-none transition-all text-xs ${
                        editable
                            ? "opacity-100"
                            : "opacity-0 select-none pointer-events-none"
                    }`}
                    value={tag}
                    placeholder="Tag Name"
                    onChange={({ target }) => setTag(target.value)}
                />
            </div>
        </div>
    );
};

UploadThumb.displayName = "UploadThumb";
export default UploadThumb;
