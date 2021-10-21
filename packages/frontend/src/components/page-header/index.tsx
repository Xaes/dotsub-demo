import React, { FC } from "react";

const PageHeader: FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
    return (
        <header className="mb-16">
            <h1 className="text-black dark:text-white mb-1 transition-colors">{title}</h1>
            <h4 className="font-normal text-gray-500 transition-colors">{subtitle}</h4>
        </header>
    );
};

PageHeader.displayName = "PageHeader";
export default PageHeader;
