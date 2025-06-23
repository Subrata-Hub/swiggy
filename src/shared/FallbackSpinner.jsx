import Spineer from "./Spineer";

const FallbackSpinner = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-950">
      <Spineer />
    </div>
  );
};

export default FallbackSpinner;
