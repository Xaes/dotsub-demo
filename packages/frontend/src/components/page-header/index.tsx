import React, { FC } from "react";

const PageHeader: FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
    return (
        <header className="mb-8 lg:mb-16">
            <h1 className="text-black dark:text-white mb-1 transition-colors break-all text-3xl lg:text-5xl">{title}</h1>
            <h4 className="font-normal text-gray-500 transition-colors mt-4 lg:mt-2 text-xl lg:text-2xl">{subtitle}</h4>
        </header>
    );
};

PageHeader.displayName = "PageHeader";
export default PageHeader;
