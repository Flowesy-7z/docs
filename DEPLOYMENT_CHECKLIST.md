# EdgeOne Pages 部署检查清单

## ✅ 部署前检查

### 📋 项目结构
- [ ] `package.json` 包含正确的构建脚本
- [ ] `docusaurus.config.js` 配置正确
- [ ] `node-functions/` 目录存在且包含 API 文件
- [ ] `static/` 目录包含必要的静态资源
- [ ] `edgeone-pages.config.js` 配置文件存在

### 🔧 配置文件
- [ ] Docusaurus 配置中的 `url` 已更新为 EdgeOne Pages 域名
- [ ] `baseUrl` 设置为 `/`
- [ ] Node Functions 导出格式正确
- [ ] API 路由配置正确

### 📦 依赖检查
- [ ] 所有依赖都在 `package.json` 中声明
- [ ] 没有使用 EdgeOne Pages 不支持的依赖
- [ ] TailwindCSS 配置正确
- [ ] PostCSS 插件配置正确

## 🚀 部署步骤

### 1. 本地测试
```bash
# 安装依赖
npm install

# 本地构建测试
npm run build

# 测试 Node Functions（需要 EdgeOne CLI）
npm run dev:functions

# 运行 API 测试
npm run test:api local
```

### 2. 推送到 Git 仓库
```bash
git add .
git commit -m "Ready for EdgeOne Pages deployment"
git push origin main
```

### 3. EdgeOne Pages 配置
- [ ] 创建新项目
- [ ] 连接 Git 仓库
- [ ] 设置构建命令：`npm run build`
- [ ] 设置输出目录：`build`
- [ ] 设置 Node.js 版本：18
- [ ] 启用 Node Functions

### 4. 环境变量设置
```bash
NODE_VERSION=18
NPM_VERSION=9
BUILD_COMMAND=npm run build
OUTPUT_DIRECTORY=build
```

## 🧪 部署后验证

### 1. 基础功能测试
- [ ] 网站可以正常访问
- [ ] 页面样式显示正确
- [ ] 导航菜单工作正常
- [ ] 搜索功能正常
- [ ] 图片缩放功能正常

### 2. API 功能测试
```bash
# 更新测试脚本中的域名
# 然后运行生产环境测试
npm run test:api production
```

- [ ] 配置生成器 API 正常
- [ ] 系统检查 API 正常
- [ ] 故障诊断 API 正常
- [ ] 实用工具 API 正常

### 3. 性能测试
- [ ] 页面加载速度 < 3秒
- [ ] API 响应时间 < 1秒
- [ ] 静态资源缓存正常
- [ ] CDN 加速生效

## 🔍 常见问题排查

### 构建失败
- [ ] 检查 Node.js 版本是否为 18+
- [ ] 检查依赖是否正确安装
- [ ] 检查构建日志中的错误信息
- [ ] 验证 `package.json` 中的构建脚本

### Node Functions 无法访问
- [ ] 检查函数文件路径是否正确
- [ ] 验证导出格式是否符合规范
- [ ] 检查 API 路由配置
- [ ] 查看函数执行日志

### 样式显示异常
- [ ] 检查 TailwindCSS 配置
- [ ] 验证 PostCSS 插件加载
- [ ] 检查静态资源路径
- [ ] 确认 CSS 文件正确生成

### API 跨域问题
- [ ] 检查 CORS 头部设置
- [ ] 验证 API 响应格式
- [ ] 检查请求方法和头部
- [ ] 确认域名配置正确

## 📊 监控设置

### 1. 访问监控
- [ ] 设置访问统计监控
- [ ] 配置性能指标告警
- [ ] 监控错误率和响应时间

### 2. 函数监控
- [ ] 监控函数执行次数
- [ ] 设置函数错误告警
- [ ] 监控函数执行时间

### 3. 资源监控
- [ ] 监控带宽使用情况
- [ ] 设置存储空间告警
- [ ] 监控 CDN 缓存命中率

## 🔒 安全检查

### 1. API 安全
- [ ] 输入验证正常工作
- [ ] 错误处理不泄露敏感信息
- [ ] 速率限制配置正确

### 2. 内容安全
- [ ] 静态资源访问控制正确
- [ ] 敏感文件不可访问
- [ ] HTTPS 重定向正常

## 📝 部署记录

### 部署信息
- **部署日期**: ___________
- **部署版本**: ___________
- **EdgeOne Pages 项目名**: ___________
- **域名**: ___________

### 测试结果
- **基础功能测试**: [ ] 通过 [ ] 失败
- **API 功能测试**: [ ] 通过 [ ] 失败
- **性能测试**: [ ] 通过 [ ] 失败

### 问题记录
- **遇到的问题**: ___________
- **解决方案**: ___________
- **备注**: ___________

## 🎉 部署完成

恭喜！您的 AikanPro 文档项目已成功部署到 EdgeOne Pages。

### 访问地址
- **主站**: https://your-project.edgeone.run
- **API 基础路径**: https://your-project.edgeone.run/api/

### 功能特性
- ✅ 完整的 Docusaurus 文档站点
- ✅ 智能配置生成工具
- ✅ 系统诊断和性能优化建议
- ✅ 实用的开发工具集合
- ✅ 全球 CDN 加速
- ✅ 企业级安全防护

### 后续维护
- 定期更新文档内容
- 监控 API 使用情况
- 根据用户反馈优化功能
- 保持依赖库的更新

---

*部署过程中如有问题，请参考 [EdgeOne Pages 官方文档](https://docs.edgeone.ai/) 或联系技术支持。*