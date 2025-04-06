import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row h-auto md:min-h-screen">

      <Sidebar />

      <div className="flex-1 bg-gray-100 p-4 overflow-x-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
