import { useEffect, useState } from "react";
import { Service } from "../service/service";

export default (photoId?: string): string | undefined => {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        const fetchImage = async () => {
            if (photoId) {
                const data = await Service.singleton.downloadImage(photoId);
                setImage(data);
            }
        };

        fetchImage();
    }, [photoId]);

    return image;
};
