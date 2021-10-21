import React, { FC } from "react";
import PageHeader from "../../components/page-header";

const NotFound: FC = () => (
    <section data-testid="not-found-section">
        <PageHeader title="Oops" subtitle="Page not found" />
    </section>
);

NotFound.displayName = "NotFound";
export default NotFound;
