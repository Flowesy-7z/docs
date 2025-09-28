# AikanPro 项目文档

## 项目概述

**AikanPro（我爱看）** 是一个基于 StarPro 二次开发的综合性在线云盘和社区系统，为社区、博客、自媒体、知识付费、论坛等场景提供完整的解决方案。该项目包含接口端、后台控制端、APP客户端、响应式网页端和微信小程序，帮助您快速构建多功能、高性能、高安全性的个人互联网社区。

### 🎯 核心价值

- **一站式解决方案**：提供从后端API到前端展示的完整技术栈
- **多端适配**：支持PC端、移动端、APP、小程序等多种访问方式
- **社区功能完善**：包含圈子模块、用户系统、任务系统等社区必备功能
- **存储灵活**：支持多种云存储服务，满足不同需求
- **易于部署**：提供详细的部署文档和技术支持

## 产品体系

### 版本对比

| 特性 | 开源版（AikanFree） | Pro版（AikanPro） |
|------|-------------------|------------------|
| **价格** | 免费 | ¥470 |
| **源代码** | 完全开源 | 前端开源 + 后端授权 |
| **功能完整度** | 基础功能 | 完整功能 |
| **技术支持** | 社区支持 | 官方技术支持 |
| **商业使用** | 允许 | 允许（需授权） |

### 技术架构

- **后端接口**：Java SpringBoot + Mybatis-plus + MySQL + Redis
- **后台管理**：PHP 7.2 + SG15加密
- **PC端管理**：Vue + Element UI
- **移动端**：UniApp框架（支持APP、H5、小程序）
- **运行环境**：Java 1.8 + MySQL 5.7 + Redis

### 系统组件

| 组件 | 作用 | 域名建议 | 授权要求 |
|------|------|----------|----------|
| **API接口** | 负责整个项目的接口服务 | api.yourdomain.com | 无授权 |
| **后台管理** | 负责整个项目的调度管理 | pro.yourdomain.com | 需要授权 |
| **H5端** | 移动端网页访问 | h5.yourdomain.com | 无授权 |
| **PC端** | 电脑端网页访问 | yourdomain.com | 无授权 |
| **APP端** | 原生移动应用 | - | 无授权 |
| **小程序** | 微信小程序 | - | 无授权 |

## 主要功能特色

### 🎨 界面与体验
- 美化的页面UI排版，整体风格简约唯美
- 响应式设计，适配各种设备屏幕
- 支持明暗主题切换

### 👥 社区功能
- 完整的圈子模块和圈主权限体系
- 用户个性化系统（背景、性别、实名认证、蓝V认证）
- 私信消息、系统通知、帖子消息推送
- 任务系统和签到系统，提升用户活跃度

### 💾 存储管理
- 支持多种存储策略同时挂载
- 支持阿里云OSS、腾讯云COS、华为云OBS、七牛云
- 支持FTP、SFTP、本地存储
- 灵活的图片上传和管理功能

### ⚙️ 管理功能
- 独立的管理后台
- 远程配置APP的UI排版、模块开关
- 完整的数据管理和统计功能
- 支持多实例运行

## 文档结构指南

本文档站点包含以下主要部分，帮助您从零开始部署和使用AikanPro：

### 📚 快速安装（必看）
- **开源版安装**：AikanFreeAPI → AikanFree后台 → AikanFreeApp → 图片上传配置
- **Pro版安装**：AikanProAPI → AikanPro后台 → AikanProApp → 图片上传配置
- 按照顺序安装，确保系统正常运行

### 🔧 配置文件（必看）
- **启动端口配置**：自定义服务端口
- **数据库配置**：MySQL连接设置
- **抢救模式**：系统故障恢复

### 🚀 高级功能
- **公共图标设置**：自定义系统图标
- **API命令表**：接口文档和调用方法
- **图标跳转配置**：自定义导航功能
- **激励广告**：广告系统配置
- **消息推送**：推送服务设置

### ❓ 常见问题
- 多实例运行配置
- 密码重置方法
- 启动失败排查
- 域名绑定教程
- 媒体上传问题解决
- 日志查看和下载

### 📁 图片上传配置
详细的云存储服务配置教程：
- 阿里云OSS配置
- 腾讯云COS配置
- 华为云OBS配置
- 七牛云配置
- FTP/SFTP配置

### 🛠️ 技术支持
- 服务资费说明
- 技术支持先决条件
- 联系方式和QQ群

## 快速开始

### 环境要求
- **服务器**：Linux/Windows系统
- **Java**：JDK 1.8+
- **数据库**：MySQL 5.7+
- **缓存**：Redis
- **PHP**：7.2+（仅后台管理需要）

### 🛠️ 智能配置工具

我们提供了强大的后端 API 工具，帮助您快速生成各种配置文件和进行系统诊断。这些工具基于 Node Functions 构建，提供真实的服务端功能。

#### 🔧 配置文件生成器
自动生成各种配置文件，包括数据库配置、Nginx配置、Docker配置等：

```js
async function generateConfig() {
  const configType = prompt("选择配置类型 (database/nginx/application/docker):");
  const domain = prompt("请输入您的域名:");
  
  const response = await fetch('/api/config-generator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: configType,
      params: { 
        domain,
        host: 'localhost',
        database: 'aikanpro',
        username: 'root'
      }
    })
  });
  
  const result = await response.json();
  if (result.success) {
    console.log("✅ 配置生成成功！");
    console.log("==================");
    if (result.config.yaml) {
      console.log("📝 YAML配置：");
      console.log(result.config.yaml);
    }
    if (result.config.config) {
      console.log("📝 Nginx配置：");
      console.log(result.config.config);
    }
    if (result.config.sql) {
      console.log("📝 SQL脚本：");
      console.log(result.config.sql);
    }
  } else {
    console.error("❌ 生成失败：", result.error);
  }
}

generateConfig();
```

#### 🔍 系统环境检查
全面检查系统环境，包括软件版本、端口状态、性能评估等：

```js
async function checkSystem() {
  const checkType = prompt("选择检查类型 (requirements/ports/performance/security):");
  
  // 收集系统信息
  const serverInfo = {
    memory: parseInt(prompt("服务器内存(GB):") || "4"),
    cpu: parseInt(prompt("CPU核心数:") || "2"),
    expectedUsers: parseInt(prompt("预期用户数:") || "100"),
    java: prompt("Java版本 (如: 1.8.0_271):") || "",
    mysql: prompt("MySQL版本 (如: 5.7.32):") || "",
    redis: prompt("Redis版本:") || "",
    php: prompt("PHP版本:") || ""
  };
  
  const response = await fetch('/api/system-check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      checkType,
      serverInfo
    })
  });
  
  const result = await response.json();
  if (result.success) {
    console.log(`✅ ${result.checkType} 检查完成！`);
    console.log("==================");
    
    if (result.result.requirements) {
      console.log(`📊 检查结果: ${result.result.summary.passed}/${result.result.summary.total} 项通过`);
      result.result.requirements.forEach(req => {
        const status = req.status === 'pass' ? '✅' : req.status === 'warning' ? '⚠️' : '❌';
        console.log(`${status} ${req.name}: ${req.current} (要求: ${req.required})`);
        if (req.solutions.length > 0) {
          req.solutions.forEach(solution => console.log(`   💡 ${solution}`));
        }
      });
    }
    
    if (result.result.performanceScore) {
      console.log(`🚀 性能评分: ${result.result.performanceScore}/100`);
      console.log("🔧 JVM配置建议:");
      result.result.jvm.options.forEach(opt => console.log(`   ${opt}`));
    }
  } else {
    console.error("❌ 检查失败：", result.error);
  }
}

checkSystem();
```

#### 🩺 智能故障诊断
基于症状和环境信息，提供详细的故障诊断和解决方案：

```js
async function diagnoseProblem() {
  console.log("🩺 智能故障诊断助手");
  console.log("====================");
  
  // 获取可用的问题类型
  const typesResponse = await fetch('/api/troubleshoot');
  const typesData = await typesResponse.json();
  
  console.log("📋 可选问题类型：");
  typesData.problemTypes.forEach((type, index) => {
    console.log(`${index + 1}. ${type.name} (${type.id}) - ${type.description}`);
  });
  
  const problemId = prompt("请输入问题ID (如: startup_failure):");
  const symptoms = prompt("请输入症状 (用逗号分隔，如: out_of_memory,high_cpu):").split(',');
  
  const response = await fetch('/api/troubleshoot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problem: problemId,
      symptoms: symptoms.filter(s => s.trim()),
      environment: {
        os: prompt("操作系统 (ubuntu/centos):") || "ubuntu"
      }
    })
  });
  
  const result = await response.json();
  if (result.success) {
    console.log(`🔍 问题诊断: ${result.diagnosis.problemName}`);
    console.log(`⚠️ 严重程度: ${result.diagnosis.severity}`);
    console.log(`⏱️ 预计解决时间: ${result.diagnosis.estimatedTime}`);
    
    console.log("
🔧 快速修复建议：");
    result.diagnosis.quickFixes.forEach((fix, index) => {
      console.log(`${index + 1}. ${fix}`);
    });
    
    console.log("
📋 详细诊断步骤：");
    result.diagnosis.diagnosticSteps.forEach((step, index) => {
      console.log(`
步骤 ${index + 1}: ${step.step}`);
      console.log("检查命令：");
      step.commands.forEach(cmd => console.log(`   $ ${cmd}`));
      console.log("故障排除：");
      step.troubleshooting.forEach(solution => console.log(`   💡 ${solution}`));
    });
    
    console.log("
🛡️ 预防措施：");
    result.diagnosis.preventiveMeasures.forEach(measure => {
      console.log(`   🔒 ${measure}`);
    });
  } else {
    console.error("❌ 诊断失败：", result.error);
  }
}

diagnoseProblem();
```

#### 🛠️ 实用工具集合
提供密码生成、JWT解码、哈希计算等常用开发工具：

```js
async function useTools() {
  console.log("🛠️ 实用工具集合");
  console.log("================");
  
  // 获取可用工具列表
  const toolsResponse = await fetch('/api/tools');
  const toolsData = await toolsResponse.json();
  
  console.log("📋 可用工具：");
  toolsData.tools.forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name} (${tool.id}) - ${tool.description}`);
  });
  
  const toolId = prompt("请选择工具ID (如: password-generator):");
  let params = {};
  
  // 根据工具类型收集参数
  switch(toolId) {
    case 'password-generator':
      params = {
        length: parseInt(prompt("密码长度 (默认16):") || "16"),
        includeUppercase: confirm("包含大写字母?"),
        includeLowercase: confirm("包含小写字母?"),
        includeNumbers: confirm("包含数字?"),
        includeSymbols: confirm("包含特殊字符?")
      };
      break;
    case 'jwt-decoder':
      params = { token: prompt("请输入JWT令牌:") };
      break;
    case 'hash-generator':
      params = { 
        text: prompt("请输入要哈希的文本:"),
        algorithm: prompt("哈希算法 (md5/sha1/sha256/sha512):") || "sha256"
      };
      break;
    case 'base64-converter':
      params = {
        text: prompt("请输入文本:"),
        operation: prompt("操作类型 (encode/decode):") || "encode"
      };
      break;
    default:
      params = { text: prompt("请输入文本:") };
  }
  
  const response = await fetch('/api/tools', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tool: toolId, params })
  });
  
  const result = await response.json();
  if (result.success) {
    console.log(`✅ ${toolId} 执行成功！`);
    console.log("==================");
    console.log("结果：", result.result);
  } else {
    console.error("❌ 工具执行失败：", result.error);
  }
}

useTools();
```

### 💡 工具特色

- **🚀 真实后端服务**：基于 Node Functions 的真实 API 服务
- **🔧 智能配置生成**：根据输入参数自动生成各种配置文件
- **🩺 专业故障诊断**：基于专业知识库的智能诊断系统
- **📊 全面系统检查**：多维度评估系统环境和性能
- **🛠️ 丰富工具集合**：包含开发和运维常用的各种小工具
- **🔒 安全可靠**：所有工具都经过安全验证，可放心使用

### 推荐安装顺序
1. **准备域名**：为各个组件准备相应的域名或子域名
2. **安装API接口**：首先部署后端接口服务
3. **安装后台管理**：部署管理后台（需要授权）
4. **配置存储**：设置图片上传和存储服务
5. **部署前端**：根据需要部署PC端、H5端或打包APP
6. **测试验证**：确保各个组件正常工作

### 重要提示
- 如果不确定选择开源版还是Pro版，建议先联系QQ：2926233597咨询
- Pro版需要域名授权，支持免费更换一次
- 首次购买Pro版包含安装服务
- 建议按照文档顺序进行安装，避免出现问题

## 演示站点

体验AikanPro的完整功能：

| 平台 | 地址 | 说明 |
|------|------|------|
| **PC端官网** | https://qxzhi.com | 电脑端完整体验 |
| **移动端** | https://m.qxzhi.com | 手机端响应式网页 |
| **微信小程序** | https://x.qxzhi.com | 小程序体验入口 |
| **文档站点** | https://docs.qxzhi.com | 本文档站点 |

## 联系与支持

### 🎯 QQ交流群
- 加入QQ群获取技术支持和交流经验
- 群链接：http://yl.qxzhi.com/liuli

### 👨‍💻 联系作者
- 技术咨询QQ：2926233597
- 联系链接：http://yl.qxzhi.com/2926233597

### 📖 相关链接
- **GitHub仓库**：https://github.com/Flowesy-7z/docs
- **官方网站**：https://cdn.li.qxzhi.com
- **技术支持**：查看[技术支持](/support/)页面了解详细服务内容

## 开始使用

准备好开始使用AikanPro了吗？

1. **了解产品**：查看[程序介绍](/feature/)了解详细功能
2. **选择版本**：根据需求选择开源版或Pro版
3. **开始安装**：按照[快速安装指南](/install/)进行部署
4. **配置系统**：参考[配置文件](/config/)进行系统设置
5. **获取支持**：遇到问题时查看[常见问题](/question/)或联系技术支持

---

*本文档持续更新中，如有疑问请及时联系技术支持。*