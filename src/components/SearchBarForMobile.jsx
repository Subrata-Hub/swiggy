import { HiOutlineSearch } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBarForMobile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const goToSearchBar = () => {
    if (pathname !== "/search") {
      localStorage.removeItem("recent_Search");
      navigate("/search");
    }
  };
  return (
    <div className="flex sm:hidden ">
      <div
        className="w-full flex justify-between px-4 items-center  h-12 rounded-2xl bg-slate-800 outline-none"
        onClick={goToSearchBar}
      >
        <p>Search for restaurant,item or more</p>
        <HiOutlineSearch className="text-2xl" />
      </div>
    </div>
  );
};

export default SearchBarForMobile;
