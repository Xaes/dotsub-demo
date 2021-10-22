import React, { FC } from "react";
import TrashIcon from "@heroicons/react/outline/TrashIcon";

const UploadPreview: FC<{
    images: string[];
    onFileDelete?: (index: number) => void;
}> = ({ images, onFileDelete }) => {
    const thumbs = images?.map((image, index) => (
        <div key={image} className="relative">
            <img src={image} className="w-full h-64 object-cover rounded-2xl" />
            {onFileDelete && (
                <button
                    type="button"
                    className="absolute top-4 right-4 rounded-button danger"
                    onClick={() => onFileDelete(index)}
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            )}
        </div>
    ));

    return images && images.length > 0 ? (
        <div className="grid grid-cols-3 mt-8 gap-12">{thumbs}</div>
    ) : null;
};

UploadPreview.displayName = "UploadPreview";
export default UploadPreview;
