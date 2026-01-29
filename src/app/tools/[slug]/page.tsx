import { tools } from "@/data/tools";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Terminal, ShieldAlert, CheckCircle2, AlertTriangle } from "lucide-react";

// 1. 生成静态路径 (保持不变)
export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.id,
  }));
}

// 2. 页面组件 - 核心修改点：
//    - 类型改为 Promise<{ slug: string }>
//    - 函数加 async
//    - 内部加 await
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 关键修复：先解包 Promise
  const { slug } = await params;

  // 使用解包后的 slug 查找数据
  const tool = tools.find((t) => t.id === slug);
  
  if (!tool) return notFound();

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-4xl mx-auto p-8 pt-12">
        {/* 顶部导航 */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors group">
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            返回索引 / Index
          </Link>
        </div>

        {/* 标题区 */}
        <header className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">{tool.name}</h1>
          <p className="text-xl text-gray-400 font-mono uppercase tracking-widest">{tool.subtitle}</p>
        </header>
        
        <div className="grid gap-10">
          {/* 01. 适用范围 */}
          <section className="border-l-4 border-black pl-6 py-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">01. SCOPE / 适用范围</h2>
            <p className="text-lg leading-relaxed font-medium text-gray-800">{tool.scope}</p>
          </section>

          {/* 02. 前置条件 */}
          <section className="bg-gray-50 rounded-sm border border-gray-200 p-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <ShieldAlert size={16} />
              02. PREREQUISITES / 前置条件
            </h2>
            <ul className="space-y-3">
              {tool.prerequisites.map((req, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </section>

          {/* 03. 安装步骤 (核心) */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Terminal size={16} />
              03. INSTALLATION / 安装流水线
            </h2>
            <div className="space-y-6">
              {tool.installSteps.map((step, index) => (
                <div key={index} className="group">
                  <p className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full text-xs">{index + 1}</span>
                    {step.label}
                  </p>
                  <div className="bg-black text-green-400 p-4 rounded-sm font-mono text-sm overflow-x-auto border border-gray-800 shadow-sm group-hover:shadow-md transition-shadow">
                    <span className="text-gray-500 select-none mr-2">$</span>
                    {step.cmd}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 04. 验证与坑 (两列布局) */}
          <div className="grid md:grid-cols-2 gap-8">
             <section className="border border-green-200 bg-green-50/50 p-6 rounded-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} />
                04. VERIFICATION / 验证
              </h2>
              <p className="text-sm text-green-900 leading-relaxed font-medium">
                {tool.verification}
              </p>
            </section>
            
            <section className="border border-red-200 bg-red-50/50 p-6 rounded-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-red-800 mb-4 flex items-center gap-2">
                <AlertTriangle size={16} />
                05. PITFALLS / 常见坑
              </h2>
              <ul className="list-disc pl-4 space-y-2 text-sm text-red-900">
                {tool.pitfalls.map((pit, idx) => <li key={idx}>{pit}</li>)}
              </ul>
            </section>
          </div>

          {/* 06. 长期建议 */}
          <section className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">06. LTS ADVICE / 长期维护</h2>
            <div className="bg-gray-900 text-gray-300 p-8 rounded-sm italic border-l-4 border-white">
              "{tool.advice}"
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}