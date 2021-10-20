import React, { FC } from "react";
import PageHeader from "../../components/page-header";

const NotFound: FC = () => (<PageHeader title="Oops" subtitle="Page not found" />);

NotFound.displayName = "NotFound";
export default NotFound;
