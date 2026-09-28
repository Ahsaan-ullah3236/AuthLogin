import { Link, NavLink } from "react-router-dom";

const navigation = [
  { label: "Overview", to: "/dashboard", icon: "▦" },
  { label: "Profile", to: "/profile", icon: "◉" },
];

export default function DashboardSidebar({ onLogout }) {
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