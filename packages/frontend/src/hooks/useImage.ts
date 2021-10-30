import { useEffect, useState } from "react";
import { Service } from "../service/service";
import { cancelablePromise } from "../utils";

export default (photoId?: string): string | undefined => {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        if (photoId) {
            const controller = new AbortController();
            cancelablePromise(async () => {
                const data = await Service.singleton.downloadImage(photoId);
                setImage(data);
            }, controller.signal)();
            return () => controller.abort();
        }
    }, [photoId]);

    return image;
};
