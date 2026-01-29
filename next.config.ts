import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. 删除 output: "export"
  // output: "export",  <-- 删掉或注释掉这行

  // 2. 如果你的服务器支持 Node.js，你可以删除 unoptimized: true 来启用 Next.js 强大的图片优化
  // images: {
  //   unoptimized: true, 
  // },

  reactStrictMode: true,
};

export default nextConfig;