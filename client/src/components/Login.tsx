import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email: email.trim(), password },
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      if (response.data.success) {
        setSuccess("Login successful. Taking you to your workspace...");
        setTimeout(() => navigate("/dashboard"), 650);
      } else {
        setError(
          response.data.message ||
            "Login failed. Please check your credentials.",
        );
      }
    } catch (requestError) {
      setError(
        requestError.response?.status === 401
          ? "Invalid email or password."
          : requestError.response?.data?.message ||
              "Something went wrong. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8f5] p-3 text-slate-900 sm:p-5 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-slate-300/40 sm:min-h-[calc(100vh-2.5rem)] lg:min-h-[calc(100vh-4rem)]">
        <section className="relative hidden w-[42%] overflow-hidden bg-[#17242c] p-10 text-white lg:flex lg:flex-col xl:p-14">
          <div className="absolute -right-20 top-16 h-72 w-72 rounded-full border-[42px] border-[#b9f35a]/10" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-[36px] border-white/5" />
          <Link
            to="/login"
            className="relative flex items-center gap-3 text-lg font-extrabold tracking-[-0.04em]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#b9f35a] text-lg font-black text-[#17242c]">
              n
            </span>
            northstar
          </Link>
          <div className="relative mt-auto max-w-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b9f35a]">
              Your personal workspace
            </p>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] xl:text-5xl">
              A calmer way to stay on top of your work.
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-6 text-slate-400">
              A secure, focused home for your account and everything you are
              building next.
            </p>
            <div className="mt-12 flex items-center gap-3 text-xs font-semibold text-slate-400">
              <span className="h-2 w-2 rounded-full bg-[#b9f35a]" /> Secure
              access, wherever you are
            </div>
          </div>
        </section>
        <section className="flex w-full flex-col px-6 py-7 sm:px-12 sm:py-10 lg:w-[58%] lg:px-16 xl:px-24">
          <div className="flex items-center justify-between lg:justify-end">
            <Link
              to="/login"
              className="flex items-center gap-2 text-base font-extrabold tracking-[-0.04em] text-slate-900 lg:hidden"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#b9f35a] font-black">
                n
              </span>
              northstar
            </Link>
            <span className="text-xs font-semibold text-slate-400">
              Secure account access
            </span>
          </div>
          <div className="my-auto w-full max-w-md py-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Welcome back
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.05em] text-slate-950 sm:text-4xl">
              Good to see you again.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sign in to pick up where you left off and return to your
              workspace.
            </p>
            <div className="mt-8">
              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    {error}
                  </div>
                )}
                {success && (
                  <div
                    role="status"
                    className="rounded-xl border border-lime-200 bg-lime-50 px-4 py-3 text-sm font-medium text-lime-800"
                  >
                    {success}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600"
                  >
                    Email address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#17242c] focus:bg-white focus:ring-4 focus:ring-[#b9f35a]/25"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-bold text-slate-500 hover:text-slate-900"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setError("");
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-20 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#17242c] focus:bg-white focus:ring-4 focus:ring-[#b9f35a]/25"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-bold text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <label className="flex items-center gap-3 pt-1 text-xs font-semibold text-slate-500">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 accent-[#17242c]"
                  />
                  Keep me signed in
                </label>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#17242c] py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-300/40 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Signing you in..." : "Sign in"}
                  <span aria-hidden="true">→</span>
                </button>
              </form>
              <p className="mt-8 text-center text-sm text-slate-500">
                New to Northstar?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-slate-950 underline decoration-[#b9f35a] decoration-2 underline-offset-4"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            © 2026 Northstar. Built for focused work.
          </p>
        </section>
      </div>
    </main>
  );
}
