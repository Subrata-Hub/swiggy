import { Link } from "react-router-dom";
import Logo from "../assets/download.png";
import Cart from "./Cart";
import Locationbar from "./Locationbar";

import { HiOutlineSearch, HiOutlineUserCircle } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className="bg-slate-950 h-20 flex items-center justify-between">
      <img src={Logo} alt="logo" className="w-12" />
      <div className="flex justify-between items-center gap-40">
        <Locationbar />
        <div className="flex gap-20">
          <Link to={`/search`}>
            <div className="flex justify-center items-center gap-2">
              <HiOutlineSearch className="text-2xl" />
              <span className="text-[18px]">Search</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <HiOutlineUserCircle className="text-2xl" /> <span>Subrata</span>
          </div>
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
