import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - AI Deployment Hub",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    // 🔴 修改点：lg:grid-cols-2 -> lg:grid-cols-[450px_1fr]
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-[450px_1fr] lg:px-0">
      
      {/* 左侧：装饰区域 (固定 450px) */}
      <div className="relative hidden h-full flex-col bg-zinc-800 p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-800" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          AI Deploy Hub
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Join the community of 500+ engineers deploying LLMs in production.&rdquo;
            </p>
            <footer className="text-sm">Server Status: Online</footer>
          </blockquote>
        </div>
      </div>
      
      {/* 右侧：表单区域 */}
      <div className="lg:p-8 bg-gray-50 h-full flex items-center justify-center">
        <AuthForm type="register" />
      </div>
    </div>
  );
}