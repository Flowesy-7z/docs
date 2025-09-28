// 系统环境检查 API
// 访问路径: /api/system-check

export const onRequestPost = async ({ request }) => {
  try {
    const data = await request.json();
    const { checkType, serverInfo } = data;
    
    let result = {};
    
    switch (checkType) {
      case 'requirements':
        result = checkSystemRequirements(serverInfo);
        break;
      case 'ports':
        result = checkPortAvailability(serverInfo);
        break;
      case 'performance':
        result = generatePerformanceRecommendations(serverInfo);
        break;
      case 'security':
        result = checkSecuritySettings(serverInfo);
        break;
      default:
        return new Response(JSON.stringify({ error: 'Invalid check type' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
    
    return new Response(JSON.stringify({
      success: true,
      checkType,
      result,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Check failed',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function checkSystemRequirements(serverInfo) {
  const { os, memory, disk, java, mysql, redis, php } = serverInfo;
  
  const requirements = [
    {
      name: 'Java版本',
      required: '1.8+',
      current: java || 'Unknown',
      status: checkJavaVersion(java),
      commands: ['java -version', 'javac -version'],
      solutions: java ? [] : ['安装 OpenJDK 8+', 'yum install java-1.8.0-openjdk', 'apt-get install openjdk-8-jdk']
    },
    {
      name: 'MySQL版本',
      required: '5.7+',
      current: mysql || 'Unknown',
      status: checkMysqlVersion(mysql),
      commands: ['mysql --version', 'systemctl status mysql'],
      solutions: mysql ? [] : ['安装 MySQL 5.7+', 'yum install mysql-server', 'apt-get install mysql-server']
    },
    {
      name: 'Redis',
      required: '任意版本',
      current: redis || 'Unknown',
      status: redis ? 'pass' : 'warning',
      commands: ['redis-server --version', 'systemctl status redis'],
      solutions: redis ? [] : ['安装 Redis', 'yum install redis', 'apt-get install redis-server']
    },
    {
      name: 'PHP版本',
      required: '7.2+',
      current: php || 'Unknown',
      status: checkPhpVersion(php),
      commands: ['php --version', 'php -m'],
      solutions: php ? [] : ['安装 PHP 7.2+', 'yum install php72', 'apt-get install php7.2']
    },
    {
      name: '内存',
      required: '2GB+',
      current: memory ? `${memory}GB` : 'Unknown',
      status: checkMemory(memory),
      commands: ['free -h', 'cat /proc/meminfo'],
      solutions: memory && memory < 2 ? ['建议升级到至少2GB内存', '考虑使用云服务器扩容'] : []
    },
    {
      name: '磁盘空间',
      required: '10GB+',
      current: disk ? `${disk}GB` : 'Unknown',
      status: checkDisk(disk),
      commands: ['df -h', 'du -sh /var/log'],
      solutions: disk && disk < 10 ? ['清理磁盘空间', '扩容磁盘', '清理日志文件'] : []
    }
  ];
  
  const overallStatus = requirements.every(req => req.status === 'pass') ? 'pass' : 
                       requirements.some(req => req.status === 'fail') ? 'fail' : 'warning';
  
  return {
    overallStatus,
    requirements,
    summary: {
      passed: requirements.filter(req => req.status === 'pass').length,
      warnings: requirements.filter(req => req.status === 'warning').length,
      failed: requirements.filter(req => req.status === 'fail').length,
      total: requirements.length
    }
  };
}

function checkPortAvailability(serverInfo) {
  const { ports = [8080, 8081, 8082, 3306, 6379] } = serverInfo;
  
  const portChecks = ports.map(port => ({
    port,
    service: getServiceByPort(port),
    checkCommand: `netstat -tlnp | grep :${port}`,
    firewallCommands: {
      centos: `firewall-cmd --permanent --add-port=${port}/tcp && firewall-cmd --reload`,
      ubuntu: `ufw allow ${port}`,
      iptables: `iptables -A INPUT -p tcp --dport ${port} -j ACCEPT`
    },
    status: 'unknown' // 实际环境中需要真实检查
  }));
  
  return {
    ports: portChecks,
    commands: {
      checkAllPorts: 'netstat -tlnp',
      checkFirewall: 'systemctl status firewalld',
      listFirewallRules: 'firewall-cmd --list-all'
    }
  };
}

function generatePerformanceRecommendations(serverInfo) {
  const { memory = 4, cpu = 2, expectedUsers = 100, storage = 'hdd' } = serverInfo;
  
  // JVM 配置
  const heapSize = Math.min(Math.floor(memory * 0.7), 8);
  const jvmConfig = {
    heapSize: `${heapSize}g`,
    gcAlgorithm: memory >= 4 ? 'G1GC' : 'ParallelGC',
    options: [
      `-Xms${heapSize}g`,
      `-Xmx${heapSize}g`,
      memory >= 4 ? '-XX:+UseG1GC' : '-XX:+UseParallelGC',
      '-XX:+HeapDumpOnOutOfMemoryError',
      '-XX:HeapDumpPath=./logs/'
    ]
  };
  
  // 数据库连接池
  const poolSize = Math.min(Math.max(Math.floor(expectedUsers / 10), 10), 50);
  const dbConfig = {
    maxPoolSize: poolSize,
    minIdle: Math.floor(poolSize / 2),
    connectionTimeout: 30000,
    idleTimeout: 600000,
    maxLifetime: 1800000
  };
  
  // Redis 配置
  const redisMemory = Math.floor(memory * 0.2);
  const redisConfig = {
    maxMemory: `${redisMemory}gb`,
    maxMemoryPolicy: 'allkeys-lru',
    saveConfig: storage === 'ssd' ? '900 1 300 10 60 10000' : '900 1 300 10'
  };
  
  // Nginx 配置
  const workerConnections = Math.min(expectedUsers * 2, 2048);
  const nginxConfig = {
    workerProcesses: cpu,
    workerConnections,
    keepaliveTimeout: 65,
    clientMaxBodySize: '100M',
    gzipCompression: true
  };
  
  // 系统级优化
  const systemOptimizations = [];
  if (memory < 2) {
    systemOptimizations.push('⚠️ 内存不足，建议升级到至少2GB');
  }
  if (expectedUsers > 500) {
    systemOptimizations.push('📈 高并发场景，建议使用负载均衡');
  }
  if (storage === 'hdd') {
    systemOptimizations.push('💾 建议使用SSD提升I/O性能');
  }
  
  return {
    serverSpecs: { memory, cpu, expectedUsers, storage },
    jvm: jvmConfig,
    database: dbConfig,
    redis: redisConfig,
    nginx: nginxConfig,
    systemOptimizations,
    performanceScore: calculatePerformanceScore(memory, cpu, expectedUsers, storage)
  };
}

function checkSecuritySettings(serverInfo) {
  const { os, firewall, ssl, backup } = serverInfo;
  
  const securityChecks = [
    {
      category: '防火墙配置',
      status: firewall ? 'pass' : 'fail',
      recommendations: firewall ? [] : [
        '启用防火墙: systemctl enable firewalld',
        '配置端口规则',
        '定期检查防火墙日志'
      ]
    },
    {
      category: 'SSL证书',
      status: ssl ? 'pass' : 'warning',
      recommendations: ssl ? [] : [
        '申请SSL证书',
        '配置HTTPS重定向',
        '使用Let\'s Encrypt免费证书'
      ]
    },
    {
      category: '数据备份',
      status: backup ? 'pass' : 'warning',
      recommendations: backup ? [] : [
        '设置数据库定时备份',
        '配置文件备份策略',
        '测试备份恢复流程'
      ]
    },
    {
      category: '系统更新',
      status: 'unknown',
      recommendations: [
        '定期更新系统补丁',
        '更新Java和依赖库',
        '监控安全漏洞'
      ]
    }
  ];
  
  return {
    checks: securityChecks,
    overallScore: calculateSecurityScore(securityChecks),
    criticalActions: securityChecks
      .filter(check => check.status === 'fail')
      .map(check => check.category)
  };
}

// 辅助函数
function checkJavaVersion(version) {
  if (!version) return 'fail';
  const match = version.match(/(\d+)\.(\d+)/);
  if (!match) return 'warning';
  const major = parseInt(match[1]);
  const minor = parseInt(match[2]);
  return (major > 1 || (major === 1 && minor >= 8)) ? 'pass' : 'fail';
}

function checkMysqlVersion(version) {
  if (!version) return 'fail';
  const match = version.match(/(\d+)\.(\d+)/);
  if (!match) return 'warning';
  const major = parseInt(match[1]);
  const minor = parseInt(match[2]);
  return (major > 5 || (major === 5 && minor >= 7)) ? 'pass' : 'fail';
}

function checkPhpVersion(version) {
  if (!version) return 'warning';
  const match = version.match(/(\d+)\.(\d+)/);
  if (!match) return 'warning';
  const major = parseInt(match[1]);
  const minor = parseInt(match[2]);
  return (major > 7 || (major === 7 && minor >= 2)) ? 'pass' : 'fail';
}

function checkMemory(memory) {
  if (!memory) return 'warning';
  return memory >= 2 ? 'pass' : memory >= 1 ? 'warning' : 'fail';
}

function checkDisk(disk) {
  if (!disk) return 'warning';
  return disk >= 10 ? 'pass' : disk >= 5 ? 'warning' : 'fail';
}

function getServiceByPort(port) {
  const services = {
    8080: 'AikanPro API',
    8081: 'AikanPro Admin',
    8082: 'AikanPro H5',
    3306: 'MySQL',
    6379: 'Redis',
    80: 'HTTP',
    443: 'HTTPS',
    22: 'SSH'
  };
  return services[port] || 'Unknown Service';
}

function calculatePerformanceScore(memory, cpu, expectedUsers, storage) {
  let score = 0;
  
  // 内存评分 (40%)
  if (memory >= 8) score += 40;
  else if (memory >= 4) score += 30;
  else if (memory >= 2) score += 20;
  else score += 10;
  
  // CPU评分 (30%)
  if (cpu >= 4) score += 30;
  else if (cpu >= 2) score += 20;
  else score += 10;
  
  // 存储评分 (20%)
  score += storage === 'ssd' ? 20 : 10;
  
  // 负载评分 (10%)
  const loadRatio = expectedUsers / (memory * cpu * 50);
  if (loadRatio <= 0.5) score += 10;
  else if (loadRatio <= 1) score += 5;
  
  return Math.min(score, 100);
}

function calculateSecurityScore(checks) {
  const passCount = checks.filter(check => check.status === 'pass').length;
  const totalCount = checks.length;
  return Math.round((passCount / totalCount) * 100);
}

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};