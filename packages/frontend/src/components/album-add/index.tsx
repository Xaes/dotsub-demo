import Loading from "../loading";
import Config from "../../config";
import { toBase64 } from "../../utils";
import DropPhotos from "../drop-photos";
import useForm from "../../hooks/useForm";
import { useHistory } from "react-router";
import React, { FC, useState } from "react";
import UploadPreview from "../upload-preview";
import { RootState } from "../../redux/slices";
import { AppDispatch } from "../../redux/store";
import { addPhoto } from "../../redux/slices/photo";
import { addAlbum } from "../../redux/slices/album";
import { useDispatch, useSelector } from "react-redux";
import { StateStatus } from "../../redux/slices/state-status";

const AlbumAdd: FC = () => {

    const history = useHistory();

    const albumStatus = useSelector<RootState, StateStatus>(
        (state) => state.Album.status
    );
    const photoStatus = useSelector<RootState, StateStatus>(
        (state) => state.Photo.status
    );
    const [files, setFiles] = useState<{ file: File; data: string }[]>([]);
    const dispatch = useDispatch<AppDispatch>();

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
        onSubmit: async ({ items }) => {
            const photosIds = files.map(async (file) => {
                const { id } = await dispatch(
                    addPhoto({
                        photo: {
                            tag: "something idk",
                            name: file.file.name,
                            extension: file.file.type,
                            size: file.file.size,
                        },
                        photoData: { data: file.data },
                    })
                ).unwrap();
                return id;
            });

            const albumId = await Promise.all(photosIds).then(async (photoIds) => {
                const { id } = await dispatch(
                    addAlbum({
                        name: items.name.value as string,
                        photoIds,
                    })
                ).unwrap();
                return id;
            });

            history.push(Config.LINKS.ALBUM.replace(":albumId", albumId));
        },
    });

    /* eslint-disable */
    console.log(albumStatus, photoStatus);

    return (
        <Loading
            loading={
                albumStatus === StateStatus.LOADING || photoStatus === StateStatus.LOADING
            }
        >
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
                                onChange={({ target }) =>
                                    registerValue("name", target.value)
                                }
                            />
                        </label>
                        {items.name.hasError && (
                            <span className="error-feedback mt-2">
                                Name is required. Name needs to be longer than 5
                                characters.
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
                                onChange={({ target }) =>
                                    registerValue("name", target.value)
                                }
                            />
                        </label>
                        {items.name.hasError && (
                            <span className="error-feedback mt-2">Email is invalid.</span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="primary-button mt-4"
                        onClick={submit}
                    >
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
        </Loading>
    );
};

AlbumAdd.displayName = "AlbumAdd";
export default AlbumAdd;
