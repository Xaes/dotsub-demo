import Config from "../../config";
import { Link } from "react-router-dom";
import React, { FC, useContext } from "react";
import SunIcon from "@heroicons/react/outline/SunIcon";
import PlusIcon from "@heroicons/react/outline/PlusIcon";
import MoonIcon from "@heroicons/react/outline/MoonIcon";
import { ReactComponent as Logo } from "../../svg/logo.svg";
import { Context as ColorSchemeContext, Colors } from "../../context/color-scheme";

const Navbar: FC = () => {
    const { data, setters } = useContext(ColorSchemeContext);

    return (
        <nav id="main-header" role="navigation">
            <div className="container px-8 py-6 lg:py-8 mx-auto flex items-center justify-between">
                <Link
                    to={Config.LINKS.HOME}
                    className="flex items-center group"
                    data-testid="navbar-logo"
                >
                    <Logo className="w-10 h-10 md:w-8 md:h-8 mr-4" />
                    <h5 className="hidden md:block leading-none group-hover:text-primary transition-colors text-black dark:text-white">
                        {Config.SEO.TITLE}
                    </h5>
                </Link>
                <div className="flex items-center space-x-5 md:space-x-10">
                    <Link
                        className="hidden md:block"
                        to={Config.LINKS.NEW_ALBUM}
                    >
                        Create a new album
                    </Link>
                    <Link
                        className="rounded-button block md:hidden"
                        to={Config.LINKS.NEW_ALBUM}
                    >
                        <PlusIcon className="h-5 w-5" />
                    </Link>
                    <button
                        onClick={setters?.toggleColor}
                        className="rounded-button"
                        role="button"
                        data-testid="theme-switcher"
                    >
                        {data?.color === Colors.DARK ? (
                            <SunIcon className="h-5 w-5" />
                        ) : (
                            <MoonIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

Navbar.displayName = "Navbar";
export default Navbar;
