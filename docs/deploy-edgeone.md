# EdgeOne Pages 部署指南

## 🚀 项目兼容性

这个 AikanPro 文档项目**完全兼容 EdgeOne Pages**，包括：

- ✅ **Docusaurus 静态站点生成**
- ✅ **Node Functions API 服务**
- ✅ **TailwindCSS 样式处理**
- ✅ **图片缩放和搜索功能**
- ✅ **多语言支持**

## 📋 部署前准备

### 1. 环境要求
- Node.js 18+ 
- npm 9+
- Git 仓库

### 2. 项目结构检查
确保项目包含以下关键文件：
```
docs_pages/
├── package.json          # 依赖和构建脚本
├── docusaurus.config.js   # Docusaurus 配置
├── edgeone-pages.config.js # EdgeOne Pages 配置
├── node-functions/        # API 函数目录
│   └── api/
│       ├── config-generator.js
│       ├── system-check.js
│       ├── troubleshoot.js
│       └── tools.js
├── docs/                  # 文档内容
├── static/               # 静态资源
└── build/                # 构建输出（自动生成）
```

## 🔧 配置调整

### 1. 更新 Docusaurus 配置
确保 `docusaurus.config.js` 中的 URL 配置正确：

```js
const config = {
  title: '我爱看',
  tagline: 'aikan 在线云盘文档',
  url: 'https://your-project.edgeone.run', // 更新为您的 EdgeOne Pages 域名
  baseUrl: '/',
  // ... 其他配置
};
```

### 2. 环境变量配置
在 EdgeOne Pages 控制台设置以下环境变量：

```bash
NODE_VERSION=18
NPM_VERSION=9
BUILD_COMMAND=npm run build
OUTPUT_DIRECTORY=build
```

## 📦 部署步骤

### 方法一：通过 Git 仓库部署

1. **推送代码到 Git 仓库**
   ```bash
   git add .
   git commit -m "Ready for EdgeOne Pages deployment"
   git push origin main
   ```

2. **在 EdgeOne Pages 控制台创建项目**
   - 选择 Git 仓库
   - 配置构建设置：
     - 构建命令：`npm run build`
     - 输出目录：`build`
     - Node.js 版本：18

3. **配置 Node Functions**
   - 函数目录：`node-functions`
   - 运行时：Node.js 18.x

### 方法二：使用 EdgeOne CLI 部署

1. **安装 EdgeOne CLI**
   ```bash
   npm install -g edgeone
   ```

2. **登录并初始化**
   ```bash
   edgeone login
   edgeone pages init
   ```

3. **本地构建测试**
   ```bash
   npm run build
   edgeone pages dev  # 本地测试 Node Functions
   ```

4. **部署到 EdgeOne Pages**
   ```bash
   edgeone pages deploy
   ```

## 🔍 Node Functions API 测试

部署完成后，您可以测试以下 API 端点：

### 配置生成器
```bash
curl -X POST https://your-project.edgeone.run/api/config-generator \
  -H "Content-Type: application/json" \
  -d '{
    "type": "database",
    "params": {
      "host": "localhost",
      "database": "aikanpro",
      "username": "root"
    }
  }'
```

### 系统检查
```bash
curl -X POST https://your-project.edgeone.run/api/system-check \
  -H "Content-Type: application/json" \
  -d '{
    "checkType": "requirements",
    "serverInfo": {
      "memory": 4,
      "cpu": 2,
      "java": "1.8.0_271"
    }
  }'
```

### 故障诊断
```bash
curl -X POST https://your-project.edgeone.run/api/troubleshoot \
  -H "Content-Type: application/json" \
  -d '{
    "problem": "startup_failure",
    "symptoms": ["out_of_memory"],
    "environment": {"os": "ubuntu"}
  }'
```

### 实用工具
```bash
curl -X POST https://your-project.edgeone.run/api/tools \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "password-generator",
    "params": {
      "length": 16,
      "includeUppercase": true,
      "includeNumbers": true
    }
  }'
```

## 🎯 性能优化

### 1. 静态资源优化
- 图片已通过 `docusaurus-plugin-image-zoom` 优化
- CSS 通过 TailwindCSS 进行了压缩
- JavaScript 代码已经过 Docusaurus 优化

### 2. CDN 加速
EdgeOne Pages 自动提供全球 CDN 加速，无需额外配置。

### 3. 缓存策略
静态资源自动设置长期缓存，API 响应设置适当的缓存头。

## 🔒 安全配置

### 1. CORS 设置
API 已配置适当的 CORS 头部，允许跨域访问。

### 2. 输入验证
所有 API 端点都包含输入验证和错误处理。

### 3. 速率限制
EdgeOne Pages 自动提供 DDoS 防护和速率限制。

## 📊 监控和日志

### 1. 访问日志
在 EdgeOne Pages 控制台查看访问统计和性能指标。

### 2. 函数日志
Node Functions 的执行日志可在控制台的"函数"部分查看。

### 3. 错误监控
设置告警规则监控 4xx/5xx 错误和函数执行失败。

## 🚨 常见问题

### Q: 构建失败怎么办？
A: 检查以下几点：
- Node.js 版本是否为 18+
- 依赖是否正确安装
- 构建命令是否正确

### Q: Node Functions 无法访问？
A: 确认：
- 函数文件路径正确
- 导出格式符合规范
- API 路由配置正确

### Q: 样式显示异常？
A: 检查：
- TailwindCSS 配置
- PostCSS 插件加载
- 静态资源路径

## 🎉 部署完成

部署成功后，您将获得：

- 📚 **完整的文档站点**：包含所有 AikanPro 相关文档
- 🛠️ **智能配置工具**：通过 API 提供配置生成服务
- 🔍 **系统诊断工具**：专业的故障排查和性能优化建议
- 🚀 **全球 CDN 加速**：EdgeOne 提供的高性能内容分发
- 🔒 **企业级安全**：DDoS 防护和安全加固

访问您的站点：`https://your-project.edgeone.run`

---

*如有部署问题，请参考 [EdgeOne Pages 官方文档](https://docs.edgeone.ai/) 或联系技术支持。*