import React, { FC } from "react";
import useForm from "../../hooks/useForm";
import { Service } from "../../service/service";

const AlbumAdd: FC = () => {
    const { registerValue, submit, items } = useForm({
        items: {
            name: {
                required: true,
                value: "",
                validate: { fn: ({ value }) => (value as string).length > 5 },
            },
        },
        onSubmit: async ({ items }) => {
            await Service.singleton.addAlbum({
                name: items.name.value as string,
                photos: [],
            });
        },
    });

    return (
        <div className="grid grid-cols-10">
            <form
                role="form"
                className="col-span-4"
                data-testid="create-album-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    submit();
                }}
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
                <button type="submit" className="primary-button mt-8">
                    Create
                </button>
            </form>
        </div>
    );
};

AlbumAdd.displayName = "AlbumAdd";
export default AlbumAdd;
