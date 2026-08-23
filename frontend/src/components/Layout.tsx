import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Topbar />

        <main className="p-8">
          <div className="page-container fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}