import React, { FC } from "react";
import { Link } from "react-router-dom";

const Card: FC<{
    title: string;
    time: string;
    image?: string;
    link: string;
}> = ({ title, time, image, link }) => (
    <Link
        to={link}
        className={`shadow-md hover:shadow-2xl rounded-md bg-white-1 dark:bg-black-2 border border-white-1 dark:border-black-2 dark:hover:bg-transparent ${
            image ? "background" : "background-pattern"
        }`}
    >
        <div className="background w-full h-64"></div>
        <div className="p-8">
            <h6 className="text-black dark:text-white leading-none">{title}</h6>
            <time
                dateTime={time.toString()}
                className="text-gray-500 font-normal text-xs leading-none"
            >
                {new Date(time).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                })}
            </time>
        </div>
    </Link>
);

Card.displayName = "Card";
export default Card;
