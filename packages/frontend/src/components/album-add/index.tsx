import DropPhotos from "../drop-photos";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import { addAlbum } from "../../redux/slices/album";
import React, { FC, useState, useEffect } from "react";
import UploadPreview from "../upload-preview";

const AlbumAdd: FC = () => {

    const [files, setFiles] = useState<File[]>([]);
    const dispatch = useDispatch();

    useEffect(
        () => () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    const onDrop = (acceptedFiles: any[]) => {
        setFiles(prevState =>
            prevState.concat(acceptedFiles.map((file) => ({
                ...file,
                preview: URL.createObjectURL(file),
            })))
        );
    }

    const onFileDelete = (index: number) => {
        setFiles(prevState => {
            const newState = Array.from(prevState);
            newState.splice(index, 1);
            return newState;
        });
    }

    const { registerValue, submit, items } = useForm({
        items: {
            name: {
                required: true,
                value: "",
                validate: { fn: ({ value }) => (value as string).length > 5 },
            },
        },
        onSubmit: async ({ items }) => {
            await dispatch(
                addAlbum({
                    name: items.name.value as string,
                    photos: [],
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
                        <span className="error-feedback mt-2">
                            Email is invalid.
                        </span>
                    )}
                </div>
                <button type="submit" className="primary-button mt-4" onClick={submit}>
                    Create
                </button>
            </form>
            <div className="col-span-6">
                <DropPhotos onDrop={onDrop} />
                <UploadPreview files={files} onFileDelete={onFileDelete} />
            </div>
        </div>
    );
};

AlbumAdd.displayName = "AlbumAdd";
export default AlbumAdd;
