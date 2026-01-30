"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isLogin = type === "login";
  const title = isLogin ? "Welcome back" : "Create an account";
  const subtitle = isLogin ? "Enter your credentials to access the hub." : "Enter your email below to create your account.";
  const btnText = isLogin ? "Sign In" : "Create Account";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/auth/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message ?? "Something went wrong. Please try again.");
        return;
      }

      if (data?.token) {
        localStorage.setItem("auth_token", data.token);
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-sm shadow-sm">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none" htmlFor="password">
              Password
            </label>
            {isLogin && (
              <a href="#" className="text-xs text-gray-500 hover:text-black hover:underline">
                Forgot password?
              </a>
            )}
          </div>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all"
          />
        </div>

        {!isLogin && (
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            />
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          disabled={loading}
          className="inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-800 h-10 px-4 py-2 w-full mt-6"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!loading && btnText}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-gray-500">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4 hover:text-black">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-black">
              Sign in
            </Link>
          </>
        )}
      </div>
      
      {/* 底部声明 */}
      <p className="mt-8 text-center text-[10px] text-gray-400">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline hover:text-gray-500">Terms of Service</a> and{" "}
        <a href="#" className="underline hover:text-gray-500">Privacy Policy</a>.
      </p>
    </div>
  );
}
