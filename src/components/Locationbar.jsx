import { HiChevronDown } from "react-icons/hi";
const Locationbar = () => {
  return (
    <div className="flex justify-center items-center gap-1 pr-[340px]">
      <input
        type="text"
        placeholder="Kolkata West Bengal, India"
        className="w-48"
      />
      <span>
        {" "}
        <HiChevronDown className="text-2xl" />
      </span>
    </div>
  );
};

export default Locationbar;
