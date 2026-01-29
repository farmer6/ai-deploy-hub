"use client";

import { Check, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner"; // 可选：如果你没装 sonner 可以去掉 toast 调用，或者用 alert

export default function PricingPage() {
  const { addItem } = useCartStore();

  // 核心逻辑：添加到购物车
  const handleAddToCart = (planName: string, price: number, id: string) => {
    addItem({
      id: id,
      name: planName,
      price: price,
      type: price > 100 ? 'subscription' : 'one-time'
    });
    
    // 简单的反馈（如果没有安装 toast 库，可以用 alert）
    // alert(`${planName} 已加入购物车`); 
  };

  // 定义样式常量
  const btnClass = "bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors rounded-sm w-full flex items-center justify-center gap-2";
  const cardClass = "border border-gray-300 p-6 bg-white rounded-sm hover:shadow-md transition-shadow flex flex-col";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold">工程服务接入 / Services</h1>
          <p className="text-gray-500 mt-2 text-sm">Enterprise-grade deployment support & documentation access.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {/* Plan 1: 教程付费 */}
          <div className={cardClass}>
            <h3 className="font-bold text-lg">Deploy Manual</h3>
            <p className="text-xs text-gray-500 mt-1">单次教程买断</p>
            <div className="my-6 text-3xl font-bold">¥ 49</div>
            <ul className="text-xs space-y-2 mb-8 flex-1">
              <li className="flex gap-2"><Check size={14} /> 全套 PDF 文档</li>
              <li className="flex gap-2"><Check size={14} /> 离线 Shell 脚本</li>
            </ul>
            <button 
              onClick={() => handleAddToCart("Deploy Manual", 49, "plan_manual")} 
              className={btnClass}
            >
              <ShoppingCart size={14} /> 加入购物车
            </button>
          </div>

          {/* Plan 2: 会员制 */}
          <div className={`${cardClass} border-black relative`}>
            <div className="absolute top-0 right-0 bg-black text-white text-[10px] px-2 py-1">RECOMMENDED</div>
            <h3 className="font-bold text-lg">Member Access</h3>
            <p className="text-xs text-gray-500 mt-1">年度订阅会员</p>
            <div className="my-6 text-3xl font-bold">¥ 299<span className="text-sm font-normal">/yr</span></div>
            <ul className="text-xs space-y-2 mb-8 flex-1">
              <li className="flex gap-2"><Check size={14} /> 解锁全部工具高级配置</li>
              <li className="flex gap-2"><Check size={14} /> 每月更新 Patch 方案</li>
              <li className="flex gap-2"><Check size={14} /> 专属 Discord 频道</li>
            </ul>
            <button 
              onClick={() => handleAddToCart("Member Access", 299, "plan_member")} 
              className={btnClass}
            >
              <ShoppingCart size={14} /> 加入购物车
            </button>
          </div>

          {/* Plan 3: 配置服务 */}
          <div className={cardClass}>
            <h3 className="font-bold text-lg">Config Service</h3>
            <p className="text-xs text-gray-500 mt-1">远程人工配置</p>
            <div className="my-6 text-3xl font-bold">¥ 599<span className="text-sm font-normal">/次</span></div>
            <ul className="text-xs space-y-2 mb-8 flex-1">
              <li className="flex gap-2"><Check size={14} /> 远程桌面协助 (AnyDesk)</li>
              <li className="flex gap-2"><Check size={14} /> 确保环境 100% 运行</li>
              <li className="flex gap-2"><Check size={14} /> 交付后 7 天质保</li>
            </ul>
            <button 
              onClick={() => handleAddToCart("Config Service", 599, "plan_config")} 
              className="bg-gray-100 text-gray-600 px-4 py-2 text-sm hover:bg-gray-200 transition-colors rounded-sm w-full flex items-center justify-center gap-2"
            >
              <ShoppingCart size={14} /> 预约时间
            </button>
          </div>

          {/* Plan 4: 咨询服务 (这个通常不需要加入购物车，而是联系客服，保持原样) */}
          <div className={`${cardClass} bg-gray-900 text-white border-none`}>
            <h3 className="font-bold text-lg">Consulting</h3>
            <p className="text-gray-400 mt-1 text-xs">企业级架构咨询</p>
            <div className="my-6 text-3xl font-bold">Custom</div>
            <ul className="text-xs space-y-2 mb-8 flex-1 text-gray-300">
              <li className="flex gap-2"><Check size={14} /> 私有化部署方案</li>
              <li className="flex gap-2"><Check size={14} /> 大规模并发架构</li>
              <li className="flex gap-2"><Check size={14} /> 安全审计</li>
            </ul>
            <button className="w-full border border-white px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors rounded-sm">
              联系商务
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}