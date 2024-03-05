import React from "react";
import { GridLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <div className="hero is-halfheight is-fullwidth is-flex is-justify-content-center is-align-items-center">
      <div className="has-text-centered">
        <GridLoader loading={loading} size={15} color={"#F14668"} />
      </div>
    </div>
  );
};

export default Loader;
