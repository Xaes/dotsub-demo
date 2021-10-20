import React, { FC } from "react";
import Layout from "./components/layout";

const App: FC = () => (
    <Layout>
        <div className="app">
            <h1 className="text-red-900">Hello World</h1>
        </div>
    </Layout>
);

export default App;
