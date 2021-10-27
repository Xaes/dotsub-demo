import React, { FC } from "react";
import { ReactComponent } from "../../svg/loading.svg";

const Loading: FC<{ loading: boolean }> = ({ loading, children }) => {
    if (loading) return (
        <div className="relative">
            <div className="opacity-50 select-none pointer-events-none">
                {children}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <ReactComponent className="animate-spin h-8 w-8 fill-current text-primary" />
            </div>
        </div>
    ); else return <React.Fragment>{children}</React.Fragment>;
}

Loading.displayName = "Loading";
export default Loading;