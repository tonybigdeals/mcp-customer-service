# Chinese Customer Service MCP Server

中文客服 MCP Server - 连接钉钉、企微、飞书客服系统到 AI 助手

## 功能

- 📋 工单管理 - 列出、查询、创建工单
- 👤 客户查询 - 获取客户信息
- 🤖 AI 摘要 - 自动生成工单摘要
- 📊 数据分析 - 客服数据统计

## 支持平台

| 平台 | 状态 | 说明 |
|-----|------|------|
| 钉钉 | ✅ 开发中 | 企业内部机器人 |
| 企微 | ⏳ 计划中 | 企业微信 |
| 飞书 | ⏳ 计划中 | 飞书客服 |

## 快速开始

### 1. 安装

```bash
npm install
```

### 2. 配置

复制 `.env.example` 为 `.env` 并填入配置：

```bash
cp .env.example .env
```

### 3. 运行

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

### 4. 在 Claude/Cursor 中使用

在 Claude Desktop 或 Cursor 中配置：

```json
{
  "mcpServers": {
    "customer-service": {
      "command": "node",
      "args": ["/path/to/mcp-customer-service/dist/index.js"],
      "env": {
        "DINGTALK_APP_KEY": "your-app-key",
        "DINGTALK_APP_SECRET": "your-app-secret",
        "DINGTALK_AGENT_ID": "your-agent-id"
      }
    }
  }
}
```

## 可用工具

### 工单管理

| 工具 | 说明 |
|-----|------|
| `list_tickets` | 列出工单列表 |
| `get_ticket` | 获取工单详情 |
| `search_tickets` | 搜索工单 |
| `create_ticket` | 创建新工单 |

### 客户管理

| 工具 | 说明 |
|-----|------|
| `get_customer` | 获取客户信息 |
| `search_customers` | 搜索客户 |

### 数据分析

| 工具 | 说明 |
|-----|------|
| `get_stats` | 获取客服统计数据 |

## 开发

```bash
# 安装依赖
npm install

# 开发模式（热重载）
npm run dev

# 构建
npm run build

# 类型检查
npm run typecheck
```

## License

MIT
