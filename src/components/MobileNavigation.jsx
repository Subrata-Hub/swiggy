import { HiOutlineSearch } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
// import Logo from "../assets/download.png";
import swiggy_logo from "../assets/swiggy-1.svg";
import { useDispatch } from "react-redux";
import { addShowNavigation } from "../utils/configSlice";

const MobileNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const goToSearchBar = () => {
    if (pathname !== "/search") {
      localStorage.removeItem("recent_Search");
      navigate("/search");
      dispatch(addShowNavigation(false));
    }
  };

  const goToHomePage = () => {
    navigate("/");
    if (window.innerWidth < 640) {
      dispatch(addShowNavigation(true));
    }
  };
  return (
    <div className="sm:hidden -ml-4 overflow-y-auto fixed bottom-0  bg-slate-800 w-full z-[10000000] ">
      <div className="h-16 flex justify-around items-center">
        <div className="flex flex-col items-center" onClick={goToHomePage}>
          <img
            src={swiggy_logo}
            alt="logo"
            className="w-8 h-6"
            loading="lazy"
          />
          {/* <Link to={"/"}>
           
          </Link> */}
          <span className="text-[12px]">SWIGGY</span>
        </div>

        <div className="flex flex-col items-center">
          <HiOutlineSearch className="text-[26px]" onClick={goToSearchBar} />
          <span className="text-[12px]">SEARCH</span>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
