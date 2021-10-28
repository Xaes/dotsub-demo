import NotFound from "../not-found";
import { useParams } from "react-router";
import { RootState } from "../../redux/slices";
import Loading from "../../components/loading";
import { Service } from "../../service/service";
import PageHeader from "../../components/page-header";
import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageHolder from "../../components/image-holder";
import TrashIcon from "@heroicons/react/outline/TrashIcon";
import { StateStatus } from "../../redux/slices/state-status";
import { selectById, fetchPhoto, deletePhoto } from "../../redux/slices/photo";

const labelClass = "font-bold text-gray-500";
const valueClass = "text-black dark:text-white font-bold ml-2 transition-colors";

const Photo: FC = () => {
    const dispatch = useDispatch();
    const [image, setImage] = useState<string>();
    const { photoId } = useParams<{ photoId: string }>();
    const [displayNotFound, setDisplayNotFound] = useState<boolean>(false);
    const photo = useSelector((state: RootState) => selectById(state, photoId));
    const status = useSelector((state: RootState) => state.Photo.status);

    useEffect(() => {
        if (photo) {
            const fetchImage = async () => {
                const data = await Service.singleton.downloadImage(photo?.dataId);
                setImage(data);
            };

            fetchImage();
        }
    }, [photo]);

    useEffect(() => {
        dispatch(fetchPhoto(photoId));
        setDisplayNotFound(true);
    }, [photoId]);

    const createdAt = photo && new Date(photo.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });

    return (
        <section data-testid="album-section">
            {photo ? (
                <React.Fragment>
                    <PageHeader
                        title={`Photo: ${photo.name}`}
                        subtitle={`Uploaded on: ${createdAt}`}
                    />
                    <div className="flex justify-start items-center mb-16">
                        <button
                            type="button"
                            role="button"
                            className="rounded-button danger"
                            onClick={() => dispatch(deletePhoto(photoId))}
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-12 gap-12">
                        <div className="col-span-9">
                            <ImageHolder
                                alt={photo.name}
                                image={image}
                                className="shadow-md hover:shadow-2xl transition-all rounded-2xl select-none"
                            />
                        </div>
                        <div className="col-span-3 space-y-4">
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
                                <span className={valueClass}>{(photo.size / 1000000).toFixed(2)} MB</span>
                            </p>
                            <p className={labelClass}>
                                Tag:
                                <span className={valueClass}>{photo.tag || "N/A"}</span>
                            </p>
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
