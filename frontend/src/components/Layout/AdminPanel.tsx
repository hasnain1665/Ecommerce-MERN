import AdminNavBar from "../AdminNavBar";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavBar />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-1 justify-center p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
