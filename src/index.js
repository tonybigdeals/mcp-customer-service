import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';

// MCP 协议工具函数
function sendJsonRpc(data) {
  process.stdout.write(JSON.stringify(data) + '\n');
}

let requestId = 0;

// 处理 JSON-RPC 请求
async function handleRequest(method, params) {
  switch (method) {
    case 'initialize':
      return {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: {
          name: 'customer-service-mcp',
          version: '1.0.0',
        },
      };

    case 'tools/list':
      return {
        tools: [
          // 工单管理
          {
            name: 'list_tickets',
            description: '列出客服工单列表，支持分页和状态筛选',
            inputSchema: {
              type: 'object',
              properties: {
                status: { type: 'string', enum: ['open', 'pending', 'resolved', 'closed'], description: '工单状态筛选' },
                page: { type: 'number', description: '页码，从1开始', default: 1 },
                pageSize: { type: 'number', description: '每页数量', default: 20 },
              },
            },
          },
          {
            name: 'get_ticket',
            description: '获取工单详情',
            inputSchema: {
              type: 'object',
              properties: { ticketId: { type: 'string', description: '工单ID' } },
              required: ['ticketId'],
            },
          },
          {
            name: 'search_tickets',
            description: '搜索工单',
            inputSchema: {
              type: 'object',
              properties: {
                keyword: { type: 'string', description: '搜索关键词' },
                status: { type: 'string', enum: ['open', 'pending', 'resolved', 'closed'], description: '工单状态筛选' },
              },
              required: ['keyword'],
            },
          },
          {
            name: 'create_ticket',
            description: '创建新工单',
            inputSchema: {
              type: 'object',
              properties: {
                title: { type: 'string', description: '工单标题' },
                content: { type: 'string', description: '工单内容' },
                priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'], description: '优先级', default: 'medium' },
                customerId: { type: 'string', description: '客户ID' },
              },
              required: ['title', 'content'],
            },
          },
          // 客户管理
          {
            name: 'get_customer',
            description: '获取客户详细信息',
            inputSchema: {
              type: 'object',
              properties: { customerId: { type: 'string', description: '客户ID' } },
              required: ['customerId'],
            },
          },
          {
            name: 'search_customers',
            description: '搜索客户',
            inputJson: {
              type: 'object',
              properties: {
                keyword: { type: 'string', description: '搜索关键词' },
                level: { type: 'string', enum: ['normal', 'silver', 'gold', 'VIP'], description: '客户等级' },
              },
              required: ['keyword'],
            },
          },
          // 数据分析
          {
            name: 'get_stats',
            description: '获取客服统计数据',
            inputSchema: {
              type: 'object',
              properties: {
                startDate: { type: 'string', description: '开始日期 (YYYY-MM-DD)' },
                endDate: { type: 'string', description: '结束日期 (YYYY-MM-DD)' },
              },
            },
          },
        ],
      };

    case 'tools/call':
      const { name, arguments: args } = params;
      return await handleToolCall(name, args);

    default:
      throw new Error(`Unknown method: ${method}`);
  }
}

// 处理工具调用
async function handleToolCall(toolName, args) {
  switch (toolName) {
    case 'list_tickets': {
      const { status, page = 1, pageSize = 20 } = args;
      // TODO: 替换为实际API调用
      const tickets = [
        { id: 'T001', title: '无法登录系统', status: 'open', customer: '张三', createdAt: '2026-03-17T10:00:00Z', priority: 'high' },
        { id: 'T002', title: '订单查询问题', status: 'pending', customer: '李四', createdAt: '2026-03-17T09:30:00Z', priority: 'medium' },
      ];
      return { content: [{ type: 'text', text: JSON.stringify({ tickets, page, pageSize, total: tickets.length }, null, 2) }] };
    }

    case 'get_ticket': {
      const { ticketId } = args;
      const ticket = {
        id: ticketId,
        title: '无法登录系统',
        status: 'open',
        customer: { id: 'C001', name: '张三', email: 'zhangsan@example.com', phone: '13800138000' },
        createdAt: '2026-03-17T10:00:00Z',
        updatedAt: '2026-03-17T10:30:00Z',
        priority: 'high',
        assignee: '客服小王',
        messages: [
          { from: 'customer', content: '我无法登录系统，提示密码错误', time: '2026-03-17T10:00:00Z' },
          { from: 'agent', content: '您好，请问您的账号是？', time: '2026-03-17T10:15:00Z' },
        ],
      };
      return { content: [{ type: 'text', text: JSON.stringify(ticket, null, 2) }] };
    }

    case 'search_tickets': {
      const { keyword } = args;
      return { content: [{ type: 'text', text: JSON.stringify({ message: `搜索"${keyword}"找到3个结果`, results: [] }, null, 2) }] };
    }

    case 'create_ticket': {
      const { title, content, priority = 'medium' } = args;
      const newTicketId = `T${Date.now()}`;
      return { content: [{ type: 'text', text: JSON.stringify({ success: true, ticketId: newTicketId, message: '工单创建成功' }, null, 2) }] };
    }

    case 'get_customer': {
      const { customerId } = args;
      const customer = {
        id: customerId,
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '13800138000',
        company: '示例公司',
        level: 'VIP',
        tags: ['电商', '高价值'],
        createdAt: '2025-06-15T00:00:00Z',
        totalOrders: 156,
        totalSpent: 58200,
      };
      return { content: [{ type: 'text', text: JSON.stringify(customer, null, 2) }] };
    }

    case 'search_customers': {
      const { keyword } = args;
      const customers = [{ id: 'C001', name: '张三', phone: '13800138000', level: 'VIP', company: '示例公司' }];
      return { content: [{ type: 'text', text: JSON.stringify({ customers, total: customers.length }, null, 2) }] };
    }

    case 'get_stats': {
      const stats = {
        overview: { totalTickets: 1234, openTickets: 56, resolvedTickets: 1178, avgResponseTime: '2.5小时', satisfaction: 4.7 },
        byChannel: { dingtalk: 580, wechat: 420, feishu: 180, email: 54 },
      };
      return { content: [{ type: 'text', text: JSON.stringify(stats, null, 2) }] };
    }

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

// 主循环
async function main() {
  process.stdin.setEncoding('utf-8');

  process.stdin.on('data', async (chunk) => {
    const lines = chunk.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      try {
        const message = JSON.parse(line);
        
        // 忽略通知（没有 id 的请求）
        if (!message.id) continue;

        const { id, method, params } = message;
        const result = await handleRequest(method, params);
        
        sendJsonRpc({ jsonrpc: '2.0', id, result });
      } catch (error) {
        sendJsonRpc({
          jsonrpc: '2.0',
          id: requestId++,
          error: { code: -32603, message: error.message }
        });
      }
    }
  });
}

console.error('Customer Service MCP Server running...');
main();
