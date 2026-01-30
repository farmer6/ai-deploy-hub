"use client";

import { Check, ShoppingCart, Terminal, Cpu, Bot, MessageSquare } from "lucide-react";
import { useCartStore } from "@/store/cart";
// import { toast } from "sonner"; // 如果没装 sonner 可以注释掉

// 定义产品数据结构
const pricingData = [
  {
    toolId: "codex",
    toolName: "OpenAI Codex",
    icon: <Terminal className="w-6 h-6" />,
    description: "强大的代码生成与补全模型，本地 CLI 部署方案。",
    plans: [
      {
        id: "codex_tutorial",
        name: "保姆级部署教程",
        price: 20,
        features: ["图文 PDF + 视频演示", "基础环境依赖清单", "常见报错速查表"],
        btnText: "加入购物车",
        isCustom: false,
      },
      {
        id: "codex_config",
        name: "手动配置 (单台)",
        price: 50,
        features: ["远程协助安装 CLI", "配置系统环境变量", "验证运行 Hello World"],
        btnText: "加入购物车",
        isCustom: false,
      },
      {
        id: "codex_debug",
        name: "插件与调试",
        price: 100,
        features: ["IDE 插件集成 (VSCode)", "网络连通性调试", "Token 轮询脚本配置"],
        btnText: "加入购物车",
        isCustom: false,
      },
      {
        id: "codex_custom",
        name: "企业高级定制",
        price: 0,
        features: ["私有化知识库对接", "高并发网关设计", "团队权限管理系统"],
        btnText: "联系客服议价",
        isCustom: true,
      },
    ],
  },
  {
    toolId: "claude",
    toolName: "Claude",
    icon: <Cpu className="w-6 h-6" />,
    description: "Anthropic 旗舰模型，解除 Region 限制与 API 封装。",
    plans: [
      {
        id: "claude_tutorial",
        name: "保姆级部署教程",
        price: 20,
        features: ["账号注册与风控规避", "API Key 获取指南", "第三方客户端推荐"],
        btnText: "加入购物车",
        isCustom: false,
      },
      {
        id: "claude_config",
        name: "手动配置 (单台)",
        price: 50,
        features: ["反向代理服务器搭建", "解决 Region 封锁", "流式响应优化"],
        btnText: "加入购物车",
        isCustom: false,
      },
      {
        id: "claude_debug",
        name: "插件与调试",
        price: 100,
        features: ["沉浸式翻译插件配置", "多账号轮询池", "额度监控告警"],
        btnText: "加入购物车",
        isCustom: false,
      },
      {
        id: "claude_custom",
        name: "企业高级定制",
        price: 0,
        features: ["企业级中转 API", "审计日志系统", "SLA 稳定性保障"],
        btnText: "联系客服议价",
        isCustom: true,
      },
    ],
  },
  {
    toolId: "moltbot",
    toolName: "Moltbot (OpenClaw)",
    icon: <Bot className="w-6 h-6" />,
    description: "多模型聚合工程化容器，一站式解决依赖管理。",
    plans: [
      {
        id: "moltbot_tutorial",
        name: "保姆级部署教程",
        price: 20,
        features: ["Docker Compose 编排", "配置参数详解", "数据持久化指南"],
        btnText: "加入购物车",
        isCustom: false,
      },
      {
        id: "moltbot_config",
        name: "手动配置 (单台)",
        price: 50,
        features: ["VPS 环境初始化", "容器健康检查配置", "自动更新脚本"],
        btnText: "加入购物车",
        isCustom: false,
      },
      {
        id: "moltbot_debug",
        name: "插件与调试",
        price: 100,
        features: ["自定义 Model 接入", "WebUI 界面优化", "数据库迁移支持"],
        btnText: "加入购物车",
        isCustom: false,
      },
      {
        id: "moltbot_custom",
        name: "企业高级定制",
        price: 0,
        features: ["源码级二次开发", "自有品牌 UI 定制", "集群化部署方案"],
        btnText: "联系客服议价",
        isCustom: true,
      },
    ],
  },
];

export default function PricingPage() {
  const { addItem } = useCartStore();

  const handleAddToCart = (planName: string, price: number, id: string) => {
    addItem({
      id: id,
      name: planName,
      price: price,
      type: 'one-time'
    });
    alert(`${planName} 已加入购物车`);
  };

  const handleContact = () => {
    alert("请联系客服微信/TG: (你的联系方式)");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 顶部 Header */}
      <div className="bg-white border-b border-gray-200 pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">工程服务接入 / Services</h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            我们为 <span className="font-bold text-black">Codex</span>, <span className="font-bold text-black">Claude</span>, <span className="font-bold text-black">Moltbot</span> 提供分级技术支持。
            <br />
            从基础文档到企业级定制，减少你的试错成本。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 space-y-20">
        
        {/* 循环渲染三大板块 */}
        {pricingData.map((tool) => (
          <section key={tool.toolId}>
            {/* 板块标题 */}
            <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
              <div className="p-2 bg-black text-white rounded-sm">
                {tool.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{tool.toolName} 系列服务</h2>
                <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
              </div>
            </div>

            {/* 卡片网格 */}
            <div className="grid md:grid-cols-4 gap-4">
              {tool.plans.map((plan) => (
                <div 
                  key={plan.id} 
                  // 🔴 修复点：移除了基础样式里的 bg-white，避免与深色模式冲突
                  className={`flex flex-col p-6 rounded-sm border transition-all duration-200
                    ${plan.isCustom 
                      ? "border-gray-900 bg-gray-900 text-white" // 深色模式
                      : "bg-white border-gray-200 hover:shadow-lg hover:border-black" // 浅色模式在这里加 bg-white
                    }`}
                >
                  <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                  
                  {/* 价格显示 */}
                  <div className="my-5">
                    {plan.isCustom ? (
                      <span className="text-2xl font-bold">Custom</span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-normal text-gray-400">¥</span>
                        <span className="text-3xl font-bold">{plan.price}</span>
                      </div>
                    )}
                  </div>

                  {/* 功能列表 */}
                  <ul className={`text-xs space-y-3 mb-8 flex-1 ${plan.isCustom ? "text-gray-300" : "text-gray-500"}`}>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <Check size={14} className={`shrink-0 ${plan.isCustom ? "text-white" : "text-black"}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 按钮 */}
                  {plan.isCustom ? (
                    <button 
                      onClick={handleContact}
                      className="w-full border border-white text-white px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors rounded-sm flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={14} /> {plan.btnText}
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleAddToCart(`${tool.toolName} - ${plan.name}`, plan.price, plan.id)} 
                      className="w-full bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors rounded-sm flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={14} /> {plan.btnText}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

      </div>

      {/* 底部补充说明 */}
      <div className="max-w-6xl mx-auto px-4 mt-20 text-center">
        <p className="text-xs text-gray-400 border-t border-gray-200 pt-8">
          * 所有服务均为虚拟商品，除“配置失败”外，不支持无理由退款。<br/>
          * 定制服务需签订技术交付合同，保障双方权益。
        </p>
      </div>
    </div>
  );
}