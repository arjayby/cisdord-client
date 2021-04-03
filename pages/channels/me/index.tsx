import Layout from "@components/Layout";
import withAuth from "@components/withAuth";
import React from "react";

const Me: React.FC = () => {
  return <Layout title="cisdord">Me page</Layout>;
};

export default withAuth(Me);
