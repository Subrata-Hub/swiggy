import { HiOutlineSearch } from "react-icons/hi";
const Searchbar = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <HiOutlineSearch className="text-2xl" />
      <span>Search</span>
    </div>
  );
};

export default Searchbar;
