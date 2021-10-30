import React, { FC } from "react";
import UploadThumb from "./thumb";

const UploadPreview: FC<{
    photos: { id: string; data: string }[];
    onFileDelete?: (index: number) => void;
    onTagAdd: (photoId: string, tag?: string) => void;
}> = ({ photos, onFileDelete, onTagAdd }) => {
    const thumbs = photos?.map((photo, index) => (
        <UploadThumb
            key={`${photo.id}-${index}`}
            photo={photo}
            index={index}
            onFileDelete={onFileDelete}
            onTagAdd={onTagAdd}
        />
    ));

    return photos && photos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-8 gap-8 lg:gap-12">{thumbs}</div>
    ) : null;
};

UploadPreview.displayName = "UploadPreview";
export default UploadPreview;
