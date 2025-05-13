import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="m-36 mt-0 mb-0">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
