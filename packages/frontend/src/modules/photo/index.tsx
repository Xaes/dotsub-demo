import Config from "../../config";
import NotFound from "../not-found";
import { RootState } from "../../redux/slices";
import Loading from "../../components/loading";
import { Service } from "../../service/service";
import { AppDispatch } from "../../redux/store";
import ShareList from "../../components/share-list";
import { useParams, useHistory } from "react-router";
import PageHeader from "../../components/page-header";
import { selectById } from "../../redux/slices/photo";
import TagIcon from "@heroicons/react/outline/TagIcon";
import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageHolder from "../../components/image-holder";
import TrashIcon from "@heroicons/react/outline/TrashIcon";
import { StateStatus } from "../../redux/slices/state-status";
import {
    fetchPhoto,
    deletePhoto,
    sharePhoto,
    unsharePhoto,
} from "../../redux/actions/photo";

const labelClass = "font-bold text-gray-500";
const valueClass = "text-black dark:text-white font-bold ml-2 transition-colors";

const Photo: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>();
    const [image, setImage] = useState<string>();
    const { photoId } = useParams<{ photoId: string }>();
    const [displayNotFound, setDisplayNotFound] = useState<boolean>(false);
    const photo = useSelector((state: RootState) => selectById(state, photoId));
    const status = useSelector((state: RootState) => state.Photo.status);

    useEffect(() => {
        if (photo) {
            const fetchImage = async () => {
                const data = await Service.singleton.downloadImage(photo.dataId);
                setImage(data);
            };

            fetchImage();
        }
    }, [photo]);

    useEffect(() => {
        dispatch(fetchPhoto(photoId));
        setDisplayNotFound(true);
    }, []);

    const createdAt =
        photo &&
        new Date(photo.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });

    const onClickDelete = async () => {
        await dispatch(deletePhoto(photoId)).unwrap();
        history.push(Config.LINKS.EXPLORE_BY_IMAGES);
    };

    const onShareAdd = async (emails: string[]) => {
        dispatch(sharePhoto({ emails, photoId }));
    };

    const onShareDelete = async (emails: string[]) => {
        dispatch(unsharePhoto({ emails, photoId }));
    };

    return (
        <section data-testid="album-section">
            {photo ? (
                <React.Fragment>
                    <PageHeader
                        title={`Photo: ${photo.name}`}
                        subtitle={`Uploaded on: ${createdAt}`}
                    />
                    <div className="flex justify-start items-center mb-8 lg:mb-16">
                        <button
                            type="button"
                            role="button"
                            className="rounded-button danger"
                            onClick={onClickDelete}
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-12 gap-0 lg:gap-12">
                        <div className="col-span-12 lg:col-span-9">
                            <ImageHolder
                                alt={photo.name}
                                image={image}
                                className="shadow-md min-h-1/2 hover:shadow-2xl transition-all rounded-2xl select-none"
                            />
                        </div>
                        <div className="col-span-12 lg:col-span-3 space-y-12 mt-16 lg:mt-0">
                            <div className="space-y-4">
                                <p className={labelClass}>
                                    Name:
                                    <span className={valueClass}>{photo.name}</span>
                                </p>
                                <p className={labelClass}>
                                    Created On:
                                    <span className={valueClass}>{createdAt}</span>
                                </p>
                                <p className={labelClass}>
                                    Extension:
                                    <span className={valueClass}>{photo.extension}</span>
                                </p>
                                <p className={labelClass}>
                                    Size:
                                    <span className={valueClass}>
                                        {(photo.size / 1000000).toFixed(2)} MB
                                    </span>
                                </p>
                                <p className={`${labelClass} flex items-center`}>
                                    Tag:
                                    <span className="px-3 py-1.5 ml-2 inline-flex items-center rounded-xl bg-primary">
                                        <TagIcon className="h-3.5 w-3.5 mr-2 text-white" />
                                        <span className="text-white text-xs font-bold">
                                            {photo.tag || "N/A"}
                                        </span>
                                    </span>
                                </p>
                            </div>
                            <ShareList
                                sharedWith={photo.sharedWith}
                                onShareAdd={onShareAdd}
                                onShareDelete={onShareDelete}
                            />
                        </div>
                    </div>
                </React.Fragment>
            ) : status === StateStatus.LOADING || !displayNotFound ? (
                <Loading loading={true} />
            ) : (
                <NotFound />
            )}
        </section>
    );
};

Photo.displayName = "Photo";
export default Photo;
