import React, { FC } from "react";
import { useParams } from "react-router";
import PageHeader from "../../components/page-header";

const Album: FC = () => {
    const { albumId } = useParams<{ albumId: string }>();
    return (
        <PageHeader
            title={`Album ${albumId}`}
            subtitle="Browse pictures"
        />
    )
};

Album.displayName = "Album";
export default Album;
