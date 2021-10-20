import Config from "./config";
import React, { FC } from "react";
import Home from "./modules/home";
import Album from "./modules/album";
import Layout from "./components/layout";
import NotFound from "./modules/not-found";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: FC = () => (
    <Layout>
        <Router>
            <Switch>
                <Route
                    exact
                    path={Config.LINKS.HOME}
                    component={() => <Home />}
                />
                <Route
                    exact
                    path={Config.LINKS.ALBUM}
                    component={() => <Album />}
                />
                <Route
                    path="*"
                    component={() => (
                        <Layout>
                            <NotFound />
                        </Layout>
                    )}
                />
            </Switch>
        </Router>
    </Layout>
);

App.displayName = "App";
export default App;
