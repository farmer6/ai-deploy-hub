import Link from "next/link";
import { 
  Terminal, Cpu, Bot, // 工具图标
  AlertTriangle, CheckCircle2, // 问题与交付图标
  ShieldAlert, ArrowRight, // 合规与链接图标
  BookOpen, Lock, Wrench // 服务结构图标
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pb-12">
      
      {/* 1. Hero 区：主视觉 */}
      <section className="border-b border-gray-200 bg-gray-50/30">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-28">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-black leading-[1.1]">
            把 AI 工具跑在<br />你自己的环境里。
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed font-light">
            这里提供的是 OpenAI Codex、Claude、Moltbot 等 AI 工具的<br className="hidden md:block" />
            <span className="font-medium text-black border-b border-gray-300">本地 CLI</span> / <span className="font-medium text-black border-b border-gray-300">API</span> / <span className="font-medium text-black border-b border-gray-300">服务器级部署</span>与长期使用指南。
          </p>
        </div>
      </section>

      {/* 2. 三大核心工具入口 */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">CORE MODULES / 核心工具</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Codex 卡片 */}
          <Link href="/tools/openai-codex" className="group block">
            <article className="h-full border border-gray-200 p-8 bg-white hover:border-black transition-colors duration-200 flex flex-col">
              <Terminal className="w-8 h-8 mb-6 stroke-1 text-gray-800 group-hover:text-black" />
              <h3 className="text-2xl font-bold mb-1">OpenAI Codex</h3>
              <p className="text-xs font-mono text-gray-500 mb-6">CLI / API / 本地 & VPS 使用</p>
              
              <ul className="text-sm text-gray-600 space-y-2 mb-8 flex-1">
                <li className="flex gap-2"><span className="text-gray-300">•</span> 官方 Codex CLI 的真实可用配置</li>
                <li className="flex gap-2"><span className="text-gray-300">•</span> API 使用方式与限制说明</li>
                <li className="flex gap-2"><span className="text-gray-300">•</span> 常见失败原因与验证方法</li>
              </ul>
              
              <div className="text-sm font-bold border-b border-gray-200 group-hover:border-black pb-1 w-fit flex items-center">
                👉 查看 Codex 部署指南 <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          </Link>

          {/* Claude 卡片 */}
          <Link href="/tools/claude" className="group block">
            <article className="h-full border border-gray-200 p-8 bg-white hover:border-black transition-colors duration-200 flex flex-col">
              <Cpu className="w-8 h-8 mb-6 stroke-1 text-gray-800 group-hover:text-black" />
              <h3 className="text-2xl font-bold mb-1">Claude</h3>
              <p className="text-xs font-mono text-gray-500 mb-6">官方使用 / API / Region 限制</p>
              
              <ul className="text-sm text-gray-600 space-y-2 mb-8 flex-1">
                <li className="flex gap-2"><span className="text-gray-300">•</span> 官方渠道下的可用方式</li>
                <li className="flex gap-2"><span className="text-gray-300">•</span> 不同 Region 的差异与限制</li>
                <li className="flex gap-2"><span className="text-gray-300">•</span> API 使用中的常见误区</li>
              </ul>
              
              <div className="text-sm font-bold border-b border-gray-200 group-hover:border-black pb-1 w-fit flex items-center">
                👉 查看 Claude 使用指南 <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          </Link>

          {/* Moltbot 卡片 */}
          <Link href="/tools/moltbot" className="group block">
            <article className="h-full border border-gray-200 p-8 bg-white hover:border-black transition-colors duration-200 flex flex-col">
              <Bot className="w-8 h-8 mb-6 stroke-1 text-gray-800 group-hover:text-black" />
              <h3 className="text-2xl font-bold mb-1">Moltbot</h3>
              <p className="text-xs font-mono text-gray-500 mb-6">原 Clawdbot / 工程化封装</p>
              
              <ul className="text-sm text-gray-600 space-y-2 mb-8 flex-1">
                <li className="flex gap-2"><span className="text-gray-300">•</span> 它解决了什么问题</li>
                <li className="flex gap-2"><span className="text-gray-300">•</span> 它<span className="font-bold text-gray-800">没有</span>解决什么问题</li>
                <li className="flex gap-2"><span className="text-gray-300">•</span> 适合场景 vs 不适合场景</li>
              </ul>
              
              <div className="text-sm font-bold border-b border-gray-200 group-hover:border-black pb-1 w-fit flex items-center">
                👉 查看 Moltbot 实战说明 <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          </Link>

        </div>
      </section>

      {/* 3 & 4. 问题与交付 (Problems & What You Get) */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2">
          
          {/* 左侧：Problems */}
          <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-gray-200">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> 01. PROBLEMS / 痛点
            </h3>
            <p className="text-xl font-bold mb-6 text-gray-900">
              很多 AI 工具的问题不在“不会用”，而在...
            </p>
            <ul className="space-y-4">
              {[
                "官方文档 能跑 ≠ 能长期跑",
                "CLI / API 在不同环境下行为不一致",
                "Region、限额、账号策略不透明",
                "封装工具隐藏了真实依赖与风险"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-600">
                  <span className="text-red-400">×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-gray-500 bg-white p-4 border border-gray-200 inline-block">
              这里的内容，专门解决这些工程化黑盒问题。
            </p>
          </div>

          {/* 右侧：What You Get */}
          <div className="p-8 md:p-16 bg-white">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 02. WHAT YOU GET / 交付
            </h3>
            <p className="text-xl font-bold mb-6 text-gray-900">
              这里的每一份内容，都会明确给出：
            </p>
            <ul className="space-y-4">
              {[
                "适用环境（本地 / VPS / OS）",
                "前置条件（账号、Region、权限）",
                "可复制的命令或配置",
                "验证是否真的可用的方法",
                "常见坑与失败场景",
                "长期使用与维护建议"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-800 font-medium">
                  <span className="text-green-600">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
               <span className="text-sm font-mono bg-black text-white px-2 py-1">PHILOSOPHY</span>
               <span className="ml-3 text-sm text-gray-600 italic">没有“理论最佳方案”，只有真实可用方案。</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 内容与服务结构 */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-10 border-b border-gray-100 pb-2">SERVICE STRUCTURE / 服务架构</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* 免费内容 */}
          <div className="bg-white">
            <div className="mb-4">
              <BookOpen className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="text-lg font-bold mb-4">免费内容</h4>
            <ul className="space-y-3 text-sm text-gray-600 border-l-2 border-gray-100 pl-4">
              <li>核心部署思路</li>
              <li>基础可行性验证</li>
              <li>风险与边界说明</li>
            </ul>
          </div>

          {/* 付费内容 */}
          <div className="bg-white">
            <div className="mb-4">
              <Lock className="w-6 h-6 text-black" />
            </div>
            <h4 className="text-lg font-bold mb-4">付费内容</h4>
            <ul className="space-y-3 text-sm text-gray-600 border-l-2 border-black pl-4">
              <li>完整可用配置方案</li>
              <li>长期使用与维护策略</li>
              <li>特定场景下的优化方案</li>
            </ul>
          </div>

           {/* 服务支持 */}
           <div className="bg-white">
            <div className="mb-4">
              <Wrench className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="text-lg font-bold mb-4">服务支持</h4>
            <ul className="space-y-3 text-sm text-gray-600 border-l-2 border-gray-100 pl-4">
              <li>付费配置（代搭 / 远程）</li>
              <li>付费咨询（按时计费）</li>
            </ul>
          </div>
        </div>

        {/* 核心引语 */}
        <div className="mt-16 bg-gray-900 text-white p-8 md:p-12 text-center md:text-left rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl md:text-2xl font-bold">
              付费的意义不是“解锁内容”，<br/>而是减少你踩坑的时间成本。
            </p>
          </div>
          <Link href="/pricing" className="shrink-0 bg-white text-black px-6 py-3 text-sm font-bold hover:bg-gray-200 transition-colors">
            查看服务方案
          </Link>
        </div>
      </section>

      {/* 6. 使用边界与合规声明 */}
      <section className="bg-red-50 border-t border-red-100 py-12 px-6">
        <div className="max-w-5xl mx-auto flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-red-700 shrink-0 mt-1" />
          <div>
            <h3 className="text-sm font-bold text-red-800 uppercase tracking-wider mb-3">使用边界与合规声明（非常重要）</h3>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-2 text-sm text-red-900/80 leading-relaxed">
              <p>• 只介绍 <span className="font-bold text-red-900">官方渠道</span> 与 <span className="font-bold text-red-900">官方能力</span></p>
              <p>• 不提供第三方充值或代购</p>
              <p>• 不保证任何账号或服务的“永久可用性”</p>
              <p>• 所有内容基于 <span className="font-bold text-red-900">公开政策 + 实际测试</span></p>
            </div>
            <p className="mt-4 text-xs text-red-800 font-mono">
              DISCLAIMER: 是否使用，由你自行判断。
            </p>
          </div>
        </div>
      </section>
      
      {/* 7. Footer */}
      <footer className="py-12 px-6 text-center border-t border-gray-200 mt-0">
         <p className="text-sm font-bold text-gray-900">AI_DEPLOY_HUB</p>
         <p className="text-xs text-gray-500 mt-2">一个专注于 AI 工具工程化使用的中性站点</p>
         <p className="text-[10px] text-gray-400 font-mono mt-6 uppercase tracking-wider">
           内容持续更新 · 但不追逐热点
         </p>
      </footer>

    </main>
  );
}