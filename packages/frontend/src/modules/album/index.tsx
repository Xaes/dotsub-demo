import React, { FC } from "react";
import { useParams } from "react-router";
import PageHeader from "../../components/page-header";

const Album: FC = () => {
    const { albumId } = useParams<{ albumId: string }>();
    return (
        <section data-testid="album-section">
            <PageHeader title={`Album ${albumId}`} subtitle="Browse pictures" />
        </section>
    );
};

Album.displayName = "Album";
export default Album;
