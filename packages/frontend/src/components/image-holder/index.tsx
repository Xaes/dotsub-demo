import React, { FC, useContext } from "react";
import { Colors, Context } from "../../context/color-scheme";
import { ReactComponent } from "../../svg/pattern.svg";

const ImageHolder: FC<{
    image?: string;
    alt: string;
}> = ({ image, alt }) => {
    const { data } = useContext(Context);

    if (image)
        return (
            <img
                src={image}
                alt={alt}
                className="object-cover w-full h-full"
            />
        );

    return (
        <div
            className={`w-full h-full ${
                data?.color === Colors.DARK ? "pattern-dark" : "pattern-light"
            }`}
        />
    );
};

ImageHolder.displayName = "ImageHolder";
export default ImageHolder;
