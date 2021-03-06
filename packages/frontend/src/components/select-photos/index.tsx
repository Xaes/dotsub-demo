import SelectItem from "./item";
import Loading from "../loading";
import { RootState } from "../../redux/slices";
import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotos } from "../../redux/actions/photo";
import { StateStatus } from "../../redux/slices/state-status";
import { selectPhotosNotInAlbum } from "../../redux/slices/photo";
import { cancelablePromise } from "../../utils";

const SelectPhotos: FC<{
    onSelect: (photoIds: string[]) => void;
}> = ({ onSelect }) => {
    const dispatch = useDispatch();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [displayResults, setDisplayResults] = useState<boolean>(false);
    const status = useSelector((state: RootState) => state.Photo.status);
    const photosNotIncluded = useSelector(selectPhotosNotInAlbum);
    const submitActive = selectedIds.length > 0;

    const toggleId = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prevState) =>
                prevState.filter((selectedId) => selectedId !== id)
            );
        } else setSelectedIds((prevState) => prevState.concat(id));
    };

    useEffect(() => {
        const controller = new AbortController();
        cancelablePromise(async () => await dispatch(fetchPhotos()), controller.signal)();
        setDisplayResults(true);
        return () => controller.abort();
    }, []);

    const photoItems = photosNotIncluded?.map((photo) => (
        <SelectItem
            key={photo.id}
            photo={photo}
            isSelected={selectedIds.includes(photo.id)}
            onSelect={() => toggleId(photo.id)}
        />
    ));

    if (status === StateStatus.LOADING || !displayResults)
        return <Loading loading={true} />;
    else if (photosNotIncluded && photosNotIncluded.length > 0)
        return (
            <div className="space-y-8">
                <h4 className="mb-8 text-xl xl:text-2xl text-black dark:text-white transition-colors">
                    Add More Photos:
                </h4>
                {photoItems}
                <button
                    type="button"
                    className={`button ${
                        submitActive ? "primary-button" : "disabled-button"
                    } w-full`}
                    onClick={() => {
                        if (submitActive) onSelect(selectedIds);
                    }}
                >
                    Add
                </button>
            </div>
        );
    else return null;
};

SelectPhotos.displayName = "SelectPhotos";
export default SelectPhotos;
