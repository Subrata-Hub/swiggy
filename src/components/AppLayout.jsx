import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
