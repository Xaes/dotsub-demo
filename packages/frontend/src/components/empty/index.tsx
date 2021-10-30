import React, { FC } from "react";
import { ReactComponent } from "../../svg/empty.svg";

const Empty: FC = ({ children }) => {
    return (
        <section data-testid="empty">
            <div className="mx-auto pb-12 block w-full h-full lg:w-1/2 lg:h-1/2 text-center">
                <ReactComponent />
                <h2 className="text-black mt-12 mb-4 dark:text-white">
                    These aren&apos;t the droids you are looking for
                </h2>
                <p className="text-md block text-gray-500 dark:text-gray-500">
                    If you are expecting something here, then you should add some data.
                </p>
                {children && <div className="mt-8">{children}</div>}
            </div>
        </section>
    );
};

Empty.displayName = "Empty";
export default Empty;
