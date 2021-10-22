import React, { FC, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadIcon from "@heroicons/react/outline/UploadIcon";

const DropPhotos: FC<{ onDrop: <T extends File>(files: T[]) => void }> = ({ onDrop }) => {

    const [error, setError] = useState<string | undefined>();
    const acceptedFiles = ["image/jpeg", "image/png"];

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFiles,
        onDropRejected: () => setError("Invalid selected files."),
        onDropAccepted: () => setError(undefined)
    });

    return (
        <React.Fragment>
            <form
                className="relative w-full h-64 cursor-pointer border-dashed border-2 transition-colors hover:border-primary dark:hover:border-primary border-gray-300 dark:border-gray-700 rounded-2xl group"
                {...getRootProps()}
            >
                <input {...getInputProps()} className="h-full" />
                <div className="drop-zone-content absolute flex inset-20 justify-center items-center">
                    <div className="text-center w-full">
                        <UploadIcon className="transition-colors w-12 h-12 mx-auto text-gray-500 group-hover:text-primary" />
                        {!isDragActive && (
                            <React.Fragment>
                                <h6 className="text-gray-500 mt-4">
                                    Drop or select your images here
                                </h6>
                                <p className="text-gray-500">
                                    Accepted Files: {acceptedFiles.join(", ")}
                                </p>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </form>
            {error && (
                <span className="error-feedback mt-4">
                    {error}
                </span>
            )}
        </React.Fragment>
    );
};

DropPhotos.displayName = "DropPhotos";
export default DropPhotos;
