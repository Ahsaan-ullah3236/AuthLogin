import { useState } from "react";
import { Link } from "react-router-dom";
import ActivitiesPanel from "../activities/ActivitiesPanel";

const stats = [
  ["Account status", "Active", "Everything looks good"],
  ["Sessions", "01", "Current session active"],
  ["Security", "Strong", "Password protected"],
  ["Member since", "Today", "Welcome to Northstar"],
];

export default function DashboardOverview() {
  const [isActivityFormOpen, setIsActivityFormOpen] = useState(false);

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
          onClick={() => setIsActivityFormOpen(true)}
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
        <ActivitiesPanel
          isFormOpen={isActivityFormOpen}
          onFormOpenChange={setIsActivityFormOpen}
        />
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