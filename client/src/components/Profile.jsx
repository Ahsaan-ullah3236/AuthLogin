import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/profile";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(localStorage.getItem("accessToken")),
  );
  const [error, setError] = useState(() =>
    localStorage.getItem("accessToken")
      ? ""
      : "Please sign in again to continue.",
  );

  useEffect(() => {
    let isMounted = true;
    const loadProfile = async () => {
      let accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken || !refreshToken) return;
      try {
        let response;
        try {
          response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        } catch (requestError) {
          if (requestError.response?.status !== 401) throw requestError;
          const refreshResponse = await axios.post(
            "http://localhost:5000/api/auth/refresh",
            { refreshToken },
          );

          accessToken = refreshResponse.data.accessToken;
          localStorage.setItem("accessToken", accessToken);

          response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        }

        if (isMounted) setProfile(response.data.data);
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.response?.data?.message ||
              "We could not load your profile.",
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="font-bold">Profile unavailable</p>
        <p className="mt-1 text-sm">
          {error || "Please sign in again to continue."}
        </p>
      </div>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <div className="mb-9">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          Workspace / Profile
        </p>
        <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
          Your profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Your identity and security details in one place.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="relative overflow-hidden rounded-2xl bg-[#17242c] p-7 text-white shadow-xl shadow-slate-300/30 sm:p-8">
          <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border-[24px] border-[#b9f35a]/10" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#b9f35a] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#17242c]">
                Member
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <i className="h-2 w-2 rounded-full bg-[#b9f35a]" /> Active
              </span>
            </div>
            <div className="mt-14 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#b9f35a] text-2xl font-black text-[#17242c]">
              {initials}
            </div>
            <h2 className="mt-6 text-2xl font-extrabold tracking-tight">
              {profile.name}
            </h2>
            <p className="mt-1 text-sm text-slate-400">{profile.email}</p>
            <div className="mt-10 border-t border-white/10 pt-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Account ID
              </p>
              <p className="mt-2 font-mono text-sm text-slate-200">
                #{profile.id}
              </p>
            </div>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
          <div className="flex items-start justify-between border-b border-slate-100 pb-6">
            <div>
              <h2 className="font-extrabold tracking-tight text-slate-950">
                Personal details
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Information linked to your account.
              </p>
            </div>
            <span className="rounded-full bg-[#efffcf] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-lime-700">
              Verified
            </span>
          </div>
          <dl className="divide-y divide-slate-100">
            <div className="grid gap-1 py-6 sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Full name
              </dt>
              <dd className="text-sm font-bold text-slate-800">
                {profile.name}
              </dd>
            </div>
            <div className="grid gap-1 py-6 sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Email
              </dt>
              <dd className="break-all text-sm font-bold text-slate-800">
                {profile.email}
              </dd>
            </div>
            <div className="grid gap-1 py-6 sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Security
              </dt>
              <dd className="text-sm font-bold text-emerald-700">
                Password protected
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
}
