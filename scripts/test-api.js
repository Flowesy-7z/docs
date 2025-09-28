#!/usr/bin/env node

/**
 * EdgeOne Pages API 测试脚本
 * 用于验证 Node Functions API 的功能
 */

const https = require('https');
const http = require('http');

// 配置
const config = {
  // 本地测试
  local: {
    host: 'localhost',
    port: 3000,
    protocol: 'http:'
  },
  // EdgeOne Pages 部署后测试
  production: {
    host: 'your-project.edgeone.run', // 替换为实际域名
    port: 443,
    protocol: 'https:'
  }
};

// 测试用例
const testCases = [
  {
    name: '配置生成器 - 数据库配置',
    method: 'POST',
    path: '/api/config-generator',
    data: {
      type: 'database',
      params: {
        host: 'localhost',
        port: '3306',
        database: 'aikanpro',
        username: 'root',
        password: 'password123'
      }
    },
    expectedKeys: ['success', 'config']
  },
  {
    name: '配置生成器 - Nginx配置',
    method: 'POST',
    path: '/api/config-generator',
    data: {
      type: 'nginx',
      params: {
        domain: 'example.com',
        apiPort: '8080',
        adminPort: '8081'
      }
    },
    expectedKeys: ['success', 'config']
  },
  {
    name: '系统检查 - 环境要求',
    method: 'POST',
    path: '/api/system-check',
    data: {
      checkType: 'requirements',
      serverInfo: {
        memory: 4,
        cpu: 2,
        java: '1.8.0_271',
        mysql: '5.7.32',
        redis: '6.2.0',
        php: '7.4.0'
      }
    },
    expectedKeys: ['success', 'result']
  },
  {
    name: '系统检查 - 性能评估',
    method: 'POST',
    path: '/api/system-check',
    data: {
      checkType: 'performance',
      serverInfo: {
        memory: 8,
        cpu: 4,
        expectedUsers: 500,
        storage: 'ssd'
      }
    },
    expectedKeys: ['success', 'result']
  },
  {
    name: '故障诊断 - 启动失败',
    method: 'POST',
    path: '/api/troubleshoot',
    data: {
      problem: 'startup_failure',
      symptoms: ['out_of_memory', 'config_error'],
      environment: {
        os: 'ubuntu'
      }
    },
    expectedKeys: ['success', 'diagnosis']
  },
  {
    name: '实用工具 - 密码生成器',
    method: 'POST',
    path: '/api/tools',
    data: {
      tool: 'password-generator',
      params: {
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true
      }
    },
    expectedKeys: ['success', 'result']
  },
  {
    name: '实用工具 - JWT解码器',
    method: 'POST',
    path: '/api/tools',
    data: {
      tool: 'jwt-decoder',
      params: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      }
    },
    expectedKeys: ['success', 'result']
  },
  {
    name: '实用工具 - Base64转换',
    method: 'POST',
    path: '/api/tools',
    data: {
      tool: 'base64-converter',
      params: {
        text: 'Hello, EdgeOne Pages!',
        operation: 'encode'
      }
    },
    expectedKeys: ['success', 'result']
  }
];

// GET 请求测试
const getTests = [
  {
    name: '故障诊断 - 获取问题类型',
    method: 'GET',
    path: '/api/troubleshoot',
    expectedKeys: ['problemTypes', 'commonSymptoms']
  },
  {
    name: '实用工具 - 获取工具列表',
    method: 'GET',
    path: '/api/tools',
    expectedKeys: ['tools', 'usage']
  }
];

// 执行 HTTP 请求
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const client = options.port === 443 || options.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: result
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body,
            parseError: error.message
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// 运行测试
async function runTests(environment = 'local') {
  const env = config[environment];
  console.log(`🚀 开始测试 ${environment} 环境`);
  console.log(`📍 目标地址: ${env.protocol}//${env.host}:${env.port}`);
  console.log('=' .repeat(60));
  
  let passed = 0;
  let failed = 0;
  
  // 测试 POST 请求
  for (const test of testCases) {
    try {
      console.log(`\n🧪 测试: ${test.name}`);
      
      const options = {
        hostname: env.host,
        port: env.port,
        path: test.path,
        method: test.method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'EdgeOne-Pages-API-Test/1.0'
        }
      };
      
      const response = await makeRequest(options, test.data);
      
      if (response.statusCode === 200) {
        const hasExpectedKeys = test.expectedKeys.every(key => 
          response.body && response.body.hasOwnProperty(key)
        );
        
        if (hasExpectedKeys) {
          console.log(`✅ 通过 (${response.statusCode})`);
          passed++;
        } else {
          console.log(`❌ 失败 - 缺少预期字段: ${test.expectedKeys.join(', ')}`);
          console.log(`   实际响应: ${JSON.stringify(Object.keys(response.body || {}))}`);
          failed++;
        }
      } else {
        console.log(`❌ 失败 (${response.statusCode})`);
        console.log(`   错误: ${JSON.stringify(response.body)}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ 失败 - 网络错误: ${error.message}`);
      failed++;
    }
  }
  
  // 测试 GET 请求
  for (const test of getTests) {
    try {
      console.log(`\n🧪 测试: ${test.name}`);
      
      const options = {
        hostname: env.host,
        port: env.port,
        path: test.path,
        method: test.method,
        headers: {
          'User-Agent': 'EdgeOne-Pages-API-Test/1.0'
        }
      };
      
      const response = await makeRequest(options);
      
      if (response.statusCode === 200) {
        const hasExpectedKeys = test.expectedKeys.every(key => 
          response.body && response.body.hasOwnProperty(key)
        );
        
        if (hasExpectedKeys) {
          console.log(`✅ 通过 (${response.statusCode})`);
          passed++;
        } else {
          console.log(`❌ 失败 - 缺少预期字段: ${test.expectedKeys.join(', ')}`);
          failed++;
        }
      } else {
        console.log(`❌ 失败 (${response.statusCode})`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ 失败 - 网络错误: ${error.message}`);
      failed++;
    }
  }
  
  // 输出测试结果
  console.log('\n' + '=' .repeat(60));
  console.log(`📊 测试结果:`);
  console.log(`   ✅ 通过: ${passed}`);
  console.log(`   ❌ 失败: ${failed}`);
  console.log(`   📈 成功率: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log(`\n🎉 所有测试通过！API 在 ${environment} 环境中运行正常。`);
  } else {
    console.log(`\n⚠️  有 ${failed} 个测试失败，请检查 API 配置和部署状态。`);
  }
  
  return { passed, failed };
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const environment = args[0] || 'local';
  
  if (!config[environment]) {
    console.error(`❌ 未知环境: ${environment}`);
    console.log(`可用环境: ${Object.keys(config).join(', ')}`);
    process.exit(1);
  }
  
  try {
    const result = await runTests(environment);
    process.exit(result.failed > 0 ? 1 : 0);
  } catch (error) {
    console.error(`❌ 测试执行失败: ${error.message}`);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { runTests, testCases, getTests };