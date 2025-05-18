import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import MobileNavigation from "./MobileNavigation";

const AppLayout = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Outlet />
      <MobileNavigation />
    </div>
  );
};

export default AppLayout;
