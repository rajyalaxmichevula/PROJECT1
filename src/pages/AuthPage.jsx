import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Workflow,
} from "lucide-react";

import { apiRequest } from "../api/client";

const InputField = ({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  minLength,
  maxLength,
  showPassword,
  onTogglePassword,
}) => {
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {name === "name"
          ? "Full name"
          : name === "email"
            ? "Email address"
            : "Password"}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          required
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-200 py-3 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
            type === "password" ? "pr-12" : "pr-4"
          }`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialMode =
    searchParams.get("mode") === "signup" ? "signup" : "login";

  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSignup = mode === "signup";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setShowPassword(false);

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const endpoint = isSignup ? "/auth/signup" : "/auth/login";

      const body = isSignup
        ? formData
        : {
            email: formData.email,
            password: formData.password,
          };

      const response = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (isSignup) {
        setMode("login");

        setFormData({
          name: "",
          email: formData.email,
          password: "",
        });

        return;
      }

      localStorage.setItem("flowforge_token", response.token);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <Workflow size={22} />
            </div>

            <span className="text-xl font-bold tracking-tight">FlowForge</span>
          </Link>

          <Link
            to="/"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid-cols-2">
          <div className="hidden bg-blue-600 p-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <Workflow size={26} />
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                Build powerful workflows with FlowForge.
              </h1>

              <p className="mt-5 max-w-md text-lg leading-8 text-blue-100">
                Orchestrate your workflows, monitor executions, and scale your
                automation from one place.
              </p>
            </div>

            <div className="space-y-4 text-sm text-blue-100">
              <p>✓ Visual workflow management</p>
              <p>✓ Execution monitoring</p>
              <p>✓ Centralized workflow operations</p>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <p className="text-sm font-medium text-blue-600">
                  Welcome to FlowForge
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {isSignup ? "Create your account" : "Welcome back"}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {isSignup
                    ? "Create your FlowForge account to get started."
                    : "Sign in to continue to your workspace."}
                </p>
              </div>

              <div className="mb-8 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className={`rounded-lg py-2.5 text-sm font-medium transition ${
                    !isSignup
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className={`rounded-lg py-2.5 text-sm font-medium transition ${
                    isSignup
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Sign up
                </button>
              </div>

              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {isSignup && (
                  <InputField
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    icon={User}
                    minLength={2}
                    maxLength={50}
                  />
                )}

                <InputField
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  icon={Mail}
                />

                <InputField
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  icon={Lock}
                  minLength={isSignup ? 8 : undefined}
                  showPassword={showPassword}
                  onTogglePassword={() =>
                    setShowPassword((current) => !current)
                  }
                />

                {!isSignup && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-500">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      Remember me
                    </label>

                    <button
                      type="button"
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Please wait..."
                    : isSignup
                      ? "Create account"
                      : "Login"}

                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-500">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => switchMode(isSignup ? "login" : "signup")}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  {isSignup ? "Login" : "Sign up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
