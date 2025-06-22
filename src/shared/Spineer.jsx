// import ClipLoader from "react-spinners/ClipLoader";

// const override = {
//   display: "block",
//   margin: "50%",

//   borderColor: "white",
// };

// const Spineer = ({ loading }) => {
//   return (
//     <div>
//       <ClipLoader
//         // color={color}
//         loading={loading}
//         cssOverride={override}
//         size={60}
//         aria-label="Loading Spinner"
//         data-testid="loader"
//       />
//     </div>
//   );
// };

// export default Spineer;

/* eslint-disable react/prop-types */
import ClipLoader from "react-spinners/ClipLoader";

// This style will center the spinner in its container
const override = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderColor: "white",
};

const Spineer = ({ loading }) => {
  return (
    <div style={{ position: "relative", height: "100px" }}>
      {" "}
      {/* Added a relative container */}
      <ClipLoader
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
