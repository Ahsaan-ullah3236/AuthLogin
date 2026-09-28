import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import Profile from "./Profile";

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfile = location.pathname === "/profile";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.success("Signed out successfully");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#f7f8f5] text-slate-900">
      <DashboardSidebar onLogout={handleLogout} />
      <div className="min-w-0 flex-1">
        <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/80 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#b9f35a] font-black">
              n
            </span>
            <span className="font-extrabold">northstar</span>
          </div>
          <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex">
            <span>Workspace</span>
            <span>/</span>
            <span className="font-semibold text-slate-700">
              {isProfile ? "Profile" : "Overview"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-right sm:block">
              <span className="block text-xs font-bold text-slate-800">
                Your account
              </span>
              <span className="block text-[11px] text-slate-400">
                Personal workspace
              </span>
            </span>
            <Link
              to="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17242c] text-xs font-black text-[#b9f35a]"
            >
              ME
            </Link>
          </div>
        </header>
        <nav className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-5 py-3 lg:hidden">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold ${isActive ? "bg-[#101820] text-white" : "text-slate-500"}`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold ${isActive ? "bg-[#101820] text-white" : "text-slate-500"}`
            }
          >
            Profile
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-auto whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold text-slate-500"
          >
            Sign out
          </button>
        </nav>
        <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
          {isProfile ? <Profile /> : <DashboardOverview />}
        </main>
      </div>
    </div>
  );
}