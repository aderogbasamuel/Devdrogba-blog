
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await register(username, email, password);

      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f0] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">

        {/* Back button */}
        <Link
          to="/"
          className="inline-block mb-6 text-sm text-gray-500 hover:text-black transition"
        >
          ← Back to home
        </Link>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-7 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.06)]">

          {/* Header */}
          <div className="mb-8">
            <span className="inline-block bg-black text-white text-[10px] font-bold tracking-[0.15em] px-2.5 py-1.5 rounded-md mb-4">
              JOIN THE BLOG
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-gray-950">
              Create Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Create an account to join the conversation and share your thoughts.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-semibold text-gray-800"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-800"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-800"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 flex justify-center gap-1 border-t border-gray-100 pt-6 text-sm text-gray-500">
            <span>Already have an account?</span>

            <Link
              to="/login"
              className="font-semibold text-gray-950 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Bottom text */}
        <p className="mt-5 text-center text-xs text-gray-400">
          Built for curious minds & late-night ideas.
        </p>
      </div>
    </main>
  );
};

export default Register;
