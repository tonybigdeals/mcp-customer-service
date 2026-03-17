# 中文客服 MCP Server - 开发进度文档

## 📋 项目概述

- **项目名称**: mcp-customer-service
- **GitHub**: https://github.com/tonybigdeals/mcp-customer-service
- **当前状态**: MVP 已完成（模拟数据）
- **下一步**: 接入真实 API

---

## ✅ Phase 1 完成情况 (Week 1-2)

| 任务 | 状态 | 说明 |
|-----|------|------|
| 创建 GitHub 仓库 | ✅ | https://github.com/tonybigdeals/mcp-customer-service |
| 项目框架搭建 | ✅ | Node.js + MCP 协议实现 |
| 定义工具接口 | ✅ | 7个工具已定义 |
| 本地测试运行 | ✅ | 服务可正常启动 |

---

## 🎯 Phase 2 待办 (Week 3-5)

### Week 3: 接入钉钉 API

- [ ] 1. 在钉钉开放平台创建应用
  - 登录 https://open.dingtalk.com/
  - 创建企业内部应用
  - 获取 App Key、App Secret、Agent ID
  
- [ ] 2. 配置环境变量
  ```bash
  cp .env.example .env
  # 编辑 .env 填入真实凭证
  ```

- [ ] 3. 替换 `src/index.js` 中的模拟数据为真实 API 调用
  - 实现 `getDingTalkToken()` - 获取 access_token
  - 实现 `listTickets()` - 调用钉钉工单 API
  - 实现 `getTicket()` - 获取工单详情
  - 实现 `createTicket()` - 创建工单

- [ ] 4. 本地测试
  ```bash
  npm start
  # 测试各个工具是否正常工作
  ```

### Week 4: 添加企微/飞书 Connector（选一个）

- [ ] 接入企业微信客服 OR 飞书客服
- [ ] 实现对应工具函数

### Week 5: AI 摘要功能

- [ ] 接入 LLM（如 DeepSeek API）
- [ ] 实现 `summarize_ticket()` - 自动生成工单摘要
- [ ] 实现 `suggest_reply()` - 智能回复建议

---

## 🚀 Phase 3 待办 (Week 6-7)

### Week 6: 产品化

- [ ] 完善 README + 使用文档
- [ ] 制作 Demo 视频
- [ ] 提交到 MCP 社区目录

### Week 7: 发布与运营

- [ ] 写技术博客宣传
- [ ] 收集用户反馈
- [ ] 迭代功能

---

## 🛠️ 技术参考

### 钉钉 API 文档

- 开放平台: https://open.dingtalk.com/
- 客服机器人 API: https://open.dingtalk.com/document/orgapp/chatbots/overview
- 获取 access_token: https://open.dingtalk.com/document/orgapp/obtain-access_token

### MCP 协议文档

- 官网: https://modelcontextprotocol.io/
- TypeScript SDK: https://github.com/modelcontextprotocol/typescript-sdk

---

## 📊 已实现的工具清单

| 工具名 | 功能 | API 状态 |
|-------|------|---------|
| `list_tickets` | 列出工单 | 模拟 |
| `get_ticket` | 获取工单详情 | 模拟 |
| `search_tickets` | 搜索工单 | 模拟 |
| `create_ticket` | 创建工单 | 模拟 |
| `get_customer` | 获取客户信息 | 模拟 |
| `search_customers` | 搜索客户 | 模拟 |
| `get_stats` | 统计数据 | 模拟 |

---

## 💰 商业模式（规划）

| 版本 | 价格 | 功能 |
|-----|------|------|
| 免费版 | ¥0 | 基础工单管理 |
| 专业版 | ¥99/月 | 5个Connector + AI摘要 |
| 企业版 | ¥399/月 | 私有部署 + 定制 |

---

## 🔧 常见问题

### Q: 如何在 Claude Desktop 中使用？

A: 在 `~/Library/Application Support/Claude/claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "customer-service": {
      "command": "node",
      "args": ["/path/to/mcp-customer-service/src/index.js"],
      "env": {
        "DINGTALK_APP_KEY": "your-key",
        "DINGTALK_APP_SECRET": "your-secret"
      }
    }
  }
}
```

### Q: 如何调试？

A: 
```bash
# 方式1: 查看日志
npm start

# 方式2: 使用 MCP Inspector
npx @modelcontextprotocol/inspector node src/index.js
```

---

## 📝 更新日志

### v1.0.0 (2026-03-17)
- ✅ MVP 完成
- ✅ 7个工具定义完成
- ✅ 模拟数据可运行
- ✅ 推送至 GitHub

---

*最后更新: 2026-03-17*
