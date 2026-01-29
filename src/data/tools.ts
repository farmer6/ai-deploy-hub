export interface ToolDetail {
  id: string;
  name: string;
  subtitle: string;
  scope: string; // 适用范围
  prerequisites: string[]; // 前置条件
  installSteps: { label: string; cmd: string }[]; // 安装步骤
  verification: string; // 验证方式
  pitfalls: string[]; // 常见坑
  advice: string; // 长期可用建议
}

export const tools: ToolDetail[] = [
  {
    id: "openai-codex",
    name: "OpenAI Codex",
    subtitle: "CLI / API",
    scope: "代码生成自动化，IDE 插件开发，后端逻辑补全。",
    prerequisites: ["Node.js v18+", "OpenAI API Key (Tier 1及以上)", "Python 3.10+ (用于 CLI 包装)"],
    installSteps: [
      { label: "安装 CLI 工具链", cmd: "npm install -g codex-cli-wrapper" },
      { label: "配置环境变量", cmd: "export OPENAI_API_KEY='sk-xxx'" },
    ],
    verification: "运行 `codex --version` 并在终端测试简单的自然语言转代码指令。",
    pitfalls: ["API 速率限制（Rate Limit）极为严格", "不仅需要 Token，还需要组织 ID 配置"],
    advice: "建议在中间层建立缓存机制，避免重复请求消耗 Token。"
  },
  {
    id: "claude",
    name: "Claude",
    subtitle: "Official / API / Region",
    scope: "长文本分析，复杂逻辑推理，自动化文档生成。",
    prerequisites: ["Anthropic Console 账号", "支持该区域的 IP 地址 (Region Lock)", "cURL 工具"],
    installSteps: [
      { label: "克隆 SDK", cmd: "git clone https://github.com/anthropic/sdk-python" },
      { label: "虚拟环境配置", cmd: "python -m venv venv && source venv/bin/activate" }
    ],
    verification: "调用 `/v1/messages` 接口并检查 `content-type: application/json` 响应。",
    pitfalls: ["区域封锁导致 403 错误", "Tokenizer 与 GPT 系列不通用，需注意 Token 计算"],
    advice: "生产环境务必绑定信用卡以确保持续服务，避免预付费耗尽导致服务中断。"
  },
  {
    id: "moltbot",
    name: "Moltbot",
    subtitle: "Clawdbot",
    scope: "特定场景下的爬虫与数据清洗机器人，自动化任务执行。",
    prerequisites: ["Docker Engine", "2GB+ RAM 独立服务器", "PostgreSQL 数据库"],
    installSteps: [
      { label: "拉取镜像", cmd: "docker pull moltbot/clawdbot:latest" },
      { label: "启动容器", cmd: "docker run -d --name moltbot -p 3000:3000 moltbot/clawdbot" }
    ],
    verification: "访问 `http://localhost:3000/health` 查看状态码 200 OK。",
    pitfalls: ["内存泄漏问题频发", "默认配置下日志文件会迅速占满磁盘空间"],
    advice: "配合 Crontab 定期重启容器，并挂载外部卷用于持久化数据。"
  }
];