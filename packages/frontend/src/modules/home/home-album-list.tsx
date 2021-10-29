import React, { FC, useEffect } from "react";
import { RootState } from "../../redux/slices";
import AlbumList from "../../components/album-list";
import { useSelector, useDispatch } from "react-redux";
import { StateStatus } from "../../redux/slices/state-status";
import { selectAll } from "../../redux/slices/album";
import { fetchAlbums } from "../../redux/actions/album";

const HomeAlbumList: FC = () => {
    const status = useSelector<RootState, StateStatus>((state) => state.Album.status);
    const albums = useSelector(selectAll);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAlbums());
    }, []);

    return <AlbumList albums={albums} loading={status === StateStatus.LOADING} />;
};

HomeAlbumList.displayName = "HomeAlbumList";
export default HomeAlbumList;
