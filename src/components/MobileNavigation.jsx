import { HiOutlineSearch } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Logo from "../assets/download.png";
import swiggy_logo from "../assets/swiggy-1.svg";

const MobileNavigation = () => {
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
    <div className="sm:hidden overflow-y-auto fixed bottom-0  bg-slate-800 w-full z-[10000000] ">
      <div className="h-16 flex justify-around items-center">
        <div className="flex flex-col items-center">
          <Link to={"/"}>
            <img src={swiggy_logo} alt="logo" className="w-8 h-5" />
          </Link>
          <span className="text-[11px]">SWIGGY</span>
        </div>

        <div className="flex flex-col items-center">
          <HiOutlineSearch className="text-[22px]" onClick={goToSearchBar} />
          <span className="text-[11px]">SEARCH</span>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
