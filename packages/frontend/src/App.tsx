import Config from "./config";
import React, { FC } from "react";
import Home from "./modules/home";
import Album from "./modules/album";
import Layout from "./components/layout";
import NotFound from "./modules/not-found";
import AlbumAdd from "./modules/album-add";
import ColorSchemeProvider from "./context/color-scheme";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

const App: FC = () => (
    <ColorSchemeProvider>
        <Router>
            <Layout>
                <Switch>
                    <Route exact strict path="/" component={() => <Redirect to={Config.LINKS.EXPLORE_BY_ALBUM} />} />
                    <Route path={Config.LINKS.HOME} component={() => <Home />} />
                    <Route exact path={Config.LINKS.ALBUM} component={() => <Album />} />
                    <Route exact path={Config.LINKS.NEW_ALBUM} component={() => <AlbumAdd />} />
                    <Route path="*" component={() => <NotFound />} />
                </Switch>
            </Layout>
        </Router>
    </ColorSchemeProvider>
);

App.displayName = "App";
export default App;
