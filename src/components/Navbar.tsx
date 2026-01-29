"use client"; // 必须标记为客户端组件，因为用到了 useState 和 localStorage

import Link from "next/link";
import { useState, useEffect } from "react";
import { Terminal, User, ShieldCheck, LogOut } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. 初始化：组件挂载后读取本地存储，防止服务端渲染不匹配 (Hydration Error)
  useEffect(() => {
    setMounted(true);
    const status = localStorage.getItem("mock_auth_status");
    if (status === "active") setIsLoggedIn(true);
  }, []);

  // 2. 模拟登录/登出逻辑
  const toggleLogin = () => {
    if (isLoggedIn) {
      localStorage.removeItem("mock_auth_status");
      setIsLoggedIn(false);
    } else {
      localStorage.setItem("mock_auth_status", "active");
      setIsLoggedIn(true);
    }
  };

  // 防止服务端渲染时的闪烁
  if (!mounted) return <nav className="h-16 border-b border-gray-200" />;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* 左侧：Logo 区 */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-black text-white p-1 rounded-sm group-hover:bg-gray-800 transition-colors">
            <Terminal size={20} />
          </div>
          <span className="font-bold tracking-tight text-lg">AI_DEPLOY_HUB</span>
        </Link>

        {/* 中间：导航链接 (仅桌面端显示) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-black hover:underline underline-offset-4 decoration-2">
            部署文档 / Docs
          </Link>
          <Link href="/pricing" className="hover:text-black hover:underline underline-offset-4 decoration-2">
            工程服务 / Pricing
          </Link>
        </div>
        
        {/* 右侧：Mock 状态控制区 */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLogin}
            className={`
              flex items-center gap-2 px-3 py-1.5 text-xs font-mono border rounded-sm transition-all
              ${isLoggedIn 
                ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' 
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
              }
            `}
          >
            {isLoggedIn ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-bold">ROOT_ACCESS</span>
                <LogOut size={12} className="ml-1" />
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <span>GUEST_MODE</span>
                <User size={12} className="ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}