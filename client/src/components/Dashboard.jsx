import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Profile from "./Profile";

const navigation = [
  { label: "Overview", to: "/dashboard", icon: "▦" },
  { label: "Profile", to: "/profile", icon: "◉" },
];

function Sidebar({ onLogout }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-800 bg-[#101820] px-5 py-6 text-white lg:flex">
      <Link to="/dashboard" className="mb-12 flex items-center gap-3 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#b9f35a] text-lg font-black text-[#101820]">
          n
        </span>
        <span className="text-lg font-extrabold tracking-[-0.04em]">
          northstar
        </span>
      </Link>
      <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
        Workspace
      </p>
      <nav className="mt-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? "bg-[#b9f35a] text-[#101820]" : "text-slate-400 hover:bg-white/5 hover:text-white"}`
            }
          >
            <span className="w-5 text-center text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold text-slate-300">Need a hand?</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Our support team is ready when you are.
        </p>
        <button type="button" className="mt-4 text-xs font-bold text-[#b9f35a]">
          Contact support <span aria-hidden="true">→</span>
        </button>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="mt-5 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
      >
        <span className="w-5 text-center">↪</span> Sign out
      </button>
    </aside>
  );
}

function Overview() {
  const stats = [
    ["Account status", "Active", "Everything looks good"],
    ["Sessions", "01", "Current session active"],
    ["Security", "Strong", "Password protected"],
    ["Member since", "Today", "Welcome to Northstar"],
  ];
  return (
    <>
      <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Tuesday, September 08, 2026
          </p>
          <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Good morning, welcome back.
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Here is the latest snapshot of your workspace.
          </p>
        </div>
        <button
          type="button"
          className="w-fit rounded-xl bg-[#101820] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300/30 transition hover:bg-slate-700"
        >
          + New activity
        </button>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, note], index) => (
          <div
            key={label}
            className={`rounded-2xl p-5 shadow-sm ${index === 0 ? "bg-[#b9f35a] shadow-lime-200/50" : "border border-slate-200 bg-white"}`}
          >
            <div className="flex items-start justify-between">
              <p
                className={`text-xs font-bold uppercase tracking-wider ${index === 0 ? "text-[#506e22]" : "text-slate-400"}`}
              >
                {label}
              </p>
              <span className="text-lg text-slate-400">
                {index === 0 ? "↗" : "◌"}
              </span>
            </div>
            <p
              className={`mt-8 text-3xl font-extrabold tracking-tight ${index === 0 ? "text-[#101820]" : "text-slate-950"}`}
            >
              {value}
            </p>
            <p
              className={`mt-2 text-xs font-semibold ${index === 0 ? "text-[#506e22]" : "text-slate-500"}`}
            >
              {note}
            </p>
          </div>
        ))}
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-extrabold tracking-tight text-slate-950">
                Recent activity
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                A quick look at your account
              </p>
            </div>
            <button
              type="button"
              className="text-xs font-bold text-slate-500 hover:text-slate-950"
            >
              View all
            </button>
          </div>
          <div className="mt-7 space-y-1">
            {["Account created", "Secure session started"].map(
              (activity, index) => (
                <div
                  key={activity}
                  className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${index === 0 ? "bg-[#efffcf] text-lime-700" : "bg-slate-100 text-slate-600"}`}
                  >
                    {index === 0 ? "✓" : "↗"}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      {activity}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Your account is ready to use.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    Today
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="rounded-2xl bg-[#17242c] p-6 text-white shadow-xl shadow-slate-300/30 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b9f35a]">
            Quick start
          </p>
          <h2 className="mt-4 max-w-xs text-2xl font-extrabold leading-tight tracking-[-0.03em]">
            Make your account yours.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Complete your profile so your workspace is ready whenever you
            return.
          </p>
          <Link
            to="/profile"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#101820] transition hover:bg-[#b9f35a]"
          >
            Review profile <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}

export default function Dashboard() {
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
      <Sidebar onLogout={handleLogout} />
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
            onClick={handleLogout}
            className="ml-auto whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold text-slate-500"
          >
            Sign out
          </button>
        </nav>
        <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
          {isProfile ? <Profile /> : <Overview />}
        </main>
      </div>
    </div>
  );
}
