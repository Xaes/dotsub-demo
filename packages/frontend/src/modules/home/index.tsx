import React, { FC } from "react";
import Config from "../../config";
import { NavLink } from "react-router-dom";
import HomeImageList from "./home-image-list";
import HomeAlbumList from "./home-album-list";
import PageHeader from "../../components/page-header";
import { Switch, Route, Redirect } from "react-router";
import CollectionIcon from "@heroicons/react/outline/CollectionIcon";
import PhotographIcon from "@heroicons/react/outline/PhotographIcon";

const Home: FC = () => (
    <section data-testid="home-section">
        <PageHeader title="Home" subtitle="Browse your albums" />
        <div className="grid grid-cols-8">
            <aside className="col-span-2 space-y-8">
                <NavLink
                    to={Config.LINKS.EXPLORE_BY_ALBUM}
                    className="flex items-center text-lg hover:text-primary"
                >
                    <CollectionIcon className="w-6 h-6 mr-4" /> By Albums
                </NavLink>
                <NavLink
                    to={Config.LINKS.EXPLORE_BY_IMAGES}
                    className="flex items-center text-lg hover:text-primary"
                >
                    <PhotographIcon className="w-6 h-6 mr-4" /> By Images
                </NavLink>
            </aside>
            <div className="col-span-6">
                <Switch>
                    <Route
                        exact
                        path={Config.LINKS.EXPLORE_BY_ALBUM}
                        render={() => <HomeAlbumList />}
                    />
                    <Route
                        exact
                        path={Config.LINKS.EXPLORE_BY_IMAGES}
                        render={() => <HomeImageList />}
                    />
                    <Route
                        path="*"
                        render={() => <Redirect to={Config.LINKS.EXPLORE_BY_ALBUM} />}
                    />
                </Switch>
            </div>
        </div>
    </section>
);

Home.displayName = "Home";
export default Home;
