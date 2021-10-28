import React, { FC, useEffect } from "react";
import { RootState } from "../../redux/slices";
import { StateStatus } from "../../redux/slices/state-status";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotos, selectAll } from "../../redux/slices/photo";
import ImageList from "../../components/image-list";
const HomeImageList: FC = () => {
    const status = useSelector<RootState, StateStatus>((state) => state.Photo.status);
    const images = useSelector(selectAll);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPhotos());
    }, []);

    return <ImageList photos={images} loading={status === StateStatus.LOADING} />;
};

HomeImageList.displayName = "HomeImageList";
export default HomeImageList;
