import React, { FC } from "react";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import { addAlbum } from "../../redux/slices/album";

const AlbumAdd: FC = () => {
    const dispatch = useDispatch();

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
        <div className="grid grid-cols-10">
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
                        <span className="error-feedback">
                            Name is required. Name needs to be longer than 5 characters.
                        </span>
                    )}
                </div>
                <button type="submit" className="primary-button mt-8" onClick={submit}>
                    Create
                </button>
            </form>
        </div>
    );
};

AlbumAdd.displayName = "AlbumAdd";
export default AlbumAdd;
