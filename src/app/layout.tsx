import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingCart from "@/components/FloatingCart"; // 1. 引入购物车组件

export const metadata: Metadata = {
  title: "AI Deployment Engineering Hub",
  description: "Technical documentation for OpenAI Codex, Claude, and Moltbot deployment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      {/* hydrationWarning 是 Next.js 的一个小优化，
        防止因浏览器插件修改 DOM 导致的 hydration 警告 
      */}
      <body suppressHydrationWarning={true}>
        <Navbar />
        
        {/* 页面主要内容 */}
        {children}

        {/* 2. 悬浮购物车 (放在这里可以覆盖在内容之上) */}
        <FloatingCart />

        <footer className="border-t border-gray-200 py-8 mt-auto text-center text-xs text-gray-400">
          <p>© 2024 AI Deploy Hub. Engineering use only.</p>
          <p className="mt-2">DYNAMIC BUILD v2.0.0 | NODE_ENV: production</p>
          <p className="mt-2">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600"
            >
              备案号：皖ICP备2026002135号-1
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
