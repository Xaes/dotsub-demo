import React, { FC } from "react";
import PageHeader from "../../components/page-header";

const Home: FC = () => (
    <section data-testid="home-section">
        <PageHeader title="Home" subtitle="Browse your albums" />
    </section>
);

Home.displayName = "Home";
export default Home;
