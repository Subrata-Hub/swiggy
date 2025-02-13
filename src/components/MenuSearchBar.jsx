import { HiMagnifyingGlass } from "react-icons/hi2";
const MenuSearchBar = () => {
  return (
    <div className="mt-4 flex items-center">
      <input
        type="text"
        placeholder="Search For dishes"
        className="text-center w-full h-12 bg-slate-800"
      />
      <HiMagnifyingGlass className="-ml-8" />
    </div>
  );
};

export default MenuSearchBar;
