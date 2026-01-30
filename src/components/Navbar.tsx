"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
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
        
        {/* 右侧：登录注册按钮区 */}
        <div className="flex items-center gap-4">
          {/* 登录按钮 */}
          <Link 
            href="/login" 
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            Sign In
          </Link>

          {/* 注册/开始按钮 (强调样式) */}
          <Link 
            href="/register" 
            className="bg-black text-white px-4 py-2 rounded-sm text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}