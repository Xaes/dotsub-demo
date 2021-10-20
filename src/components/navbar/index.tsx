import React, { FC } from "react";
import Config from "../../config";
import { Link } from "react-router-dom";
import SunIcon from "@heroicons/react/outline/SunIcon";
import MoonIcon from "@heroicons/react/outline/MoonIcon";
import { ReactComponent as Logo } from "../../svg/logo.svg";

const Navbar: FC = () => (
    <header id="main-header" role="navigation">
        <div className="container p-8 mx-auto flex items-center justify-between">
            <Link to={Config.LINKS.HOME} className="flex items-center group">
                <Logo className="w-8 h-8 mr-4" />
                <h5 className="leading-none group-hover:text-primary transition-colors text-black dark:text-white">
                    {Config.SEO.TITLE}
                </h5>
            </Link>
            <div className="flex items-center space-x-10">
                <Link to={Config.LINKS.NEW_ALBUM}>Create a new album</Link>
                <button className="rounded-button" role="button">
                    <MoonIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    </header>
);

Navbar.displayName = "Navbar";
export default Navbar;
