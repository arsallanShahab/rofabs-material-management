import PropTypes from "prop-types";
import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-gray-900"></div>
      <p className="mt-4 text-sm text-gray-900 font-medium">{text}</p>
    </div>
  );
};

Loader.propTypes = {
  text: PropTypes.string,
};

export default Loader;
