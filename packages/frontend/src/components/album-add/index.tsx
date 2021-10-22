import { toBase64 } from "../../utils";
import DropPhotos from "../drop-photos";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import UploadPreview from "../upload-preview";
import { addPhoto } from "../../redux/slices/photo";
import { addAlbum } from "../../redux/slices/album";
import React, { FC, useState, useEffect } from "react";

const AlbumAdd: FC = () => {
    const [files, setFiles] = useState<{ file: File; data: string }[]>([]);
    const dispatch = useDispatch();

    const onDrop = async (acceptedFiles: any[]) => {
        const newFiles = acceptedFiles.map(async (file) => ({
            file: file,
            data: await toBase64(new Blob([file])),
        }));

        await Promise.all(newFiles).then((files) => {
            setFiles((prevState) => {
                return prevState.concat(files);
            });
        });
    };

    /*eslint-disable*/
    console.log(files);

    const onFileDelete = (index: number) => {
        setFiles((prevState) => {
            const newState = Array.from(prevState);
            newState.splice(index, 1);
            return newState;
        });
    };

    const { registerValue, submit, items } = useForm({
        items: {
            name: {
                required: true,
                value: "",
                validate: { fn: ({ value }) => (value as string).length > 5 },
            },
        },
        onSubmit: ({ items }) => {
            files.forEach((file) => {
                dispatch(
                    addPhoto({
                        photo: {
                            tag: "something idk",
                            name: file.file.name,
                            extension: file.file.type,
                            size: file.file.size,
                        },
                        photoData: { data: file.data },
                    })
                );
            });
            dispatch(
                addAlbum({
                    name: items.name.value as string,
                    photoIds: [],
                })
            );
        },
    });

    return (
        <div className="grid grid-cols-10 gap-24">
            <form
                role="form"
                className="col-span-4"
                data-testid="create-album-form"
                onSubmit={(event) => event.preventDefault()}
            >
                <div className="form-group">
                    <label>
                        <span>Name: </span>
                        <input
                            placeholder="Name..."
                            type="text"
                            value={items.name.value as string}
                            onChange={({ target }) => registerValue("name", target.value)}
                        />
                    </label>
                    {items.name.hasError && (
                        <span className="error-feedback mt-2">
                            Name is required. Name needs to be longer than 5 characters.
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label>
                        <span>Invite: </span>
                        <input
                            placeholder="Name..."
                            type="text"
                            value={items.name.value as string}
                            onChange={({ target }) => registerValue("name", target.value)}
                        />
                    </label>
                    {items.name.hasError && (
                        <span className="error-feedback mt-2">Email is invalid.</span>
                    )}
                </div>
                <button type="submit" className="primary-button mt-4" onClick={submit}>
                    Create
                </button>
            </form>
            <div className="col-span-6">
                <DropPhotos onDrop={onDrop} />
                <UploadPreview
                    images={files.map((f) => f.data)}
                    onFileDelete={onFileDelete}
                />
            </div>
        </div>
    );
};

AlbumAdd.displayName = "AlbumAdd";
export default AlbumAdd;
