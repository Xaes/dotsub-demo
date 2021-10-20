import React, { FC } from "react";

const PageHeader: FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => {
    return (
        <header className="mb-8">
            <h1 className="text-black dark:text-white mb-1">{title}</h1>
            <h4 className="font-normal text-gray-500">{subtitle}</h4>
        </header>
    );
}

PageHeader.displayName = "PageHeader";
export default PageHeader;