import React, { FC } from "react";
import AlbumAddForm from "../../components/album-add";
import PageHeader from "../../components/page-header";

const AlbumAdd: FC = () => {
    return (
        <section data-testid="album-add-section">
            <PageHeader title="Create Album" subtitle="Fill the form below" />
            <AlbumAddForm />
        </section>
    );
};

AlbumAdd.displayName = "AlbumAdd";
export default AlbumAdd;
