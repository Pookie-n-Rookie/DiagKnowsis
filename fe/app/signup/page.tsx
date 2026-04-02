"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const IconActivity = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export default function SignupPage() {
  const END_POINT = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"}/api/auth/signup`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup() {
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(END_POINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 201) {
        toast.success("Signup successful! Please login.");
        router.push("/login");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#E0E5EC" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md rounded-[32px] p-10"
        style={{
          background: "#E0E5EC",
          boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)",
        }}
      >
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              boxShadow: "inset 10px 10px 20px rgb(163,177,198,0.7), inset -10px -10px 20px rgba(255,255,255,0.6)",
            }}
          >
            <div
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg, #6C63FF, #8B84FF)',
                boxShadow: '4px 4px 8px rgb(163,177,198,0.6), -4px -4px 8px rgba(255,255,255,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
              }}
            >
              <IconActivity />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="font-display font-extrabold text-3xl text-center tracking-tight mb-1"
          style={{ color: "#3D4852" }}
        >
          Create an account
        </h1>
        <p className="text-center text-sm mb-8" style={{ color: "#6B7280" }}>
          Start your journey with DiagKnowSis today
        </p>

        {/* Fields */}
        <div className="flex flex-col gap-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#6B7280" }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              className="neu-input w-full px-5 py-4 text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#6B7280" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              className="neu-input w-full px-5 py-4 text-sm"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="btn-primary w-full py-4 rounded-2xl text-base font-semibold text-white mt-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:ring-offset-2 focus:ring-offset-[#E0E5EC]"
          >
            {loading ? "Creating account…" : "Sign up"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px" style={{ background: "rgba(163,177,198,0.4)" }} />
          <span className="text-xs" style={{ color: "#6B7280" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "rgba(163,177,198,0.4)" }} />
        </div>

        {/* Switch */}
        <p className="text-center text-sm" style={{ color: "#6B7280" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold focus:outline-none focus:ring-2 focus:ring-[#6C63FF] rounded"
            style={{ color: "#6C63FF" }}
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}