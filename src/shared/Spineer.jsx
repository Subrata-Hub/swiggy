/* eslint-disable react/prop-types */

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "50%",

  borderColor: "white",
};

const Spineer = ({ loading }) => {
  return (
    <div>
      <ClipLoader
        // color={color}
        loading={loading}
        cssOverride={override}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spineer;
