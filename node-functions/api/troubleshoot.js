// 故障诊断 API
// 访问路径: /api/troubleshoot

export const onRequestPost = async ({ request }) => {
  try {
    const data = await request.json();
    const { problem, symptoms, environment } = data;
    
    const diagnosis = diagnoseProblem(problem, symptoms, environment);
    
    return new Response(JSON.stringify({
      success: true,
      problem,
      diagnosis,
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
      error: 'Diagnosis failed',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function diagnoseProblem(problem, symptoms = [], environment = {}) {
  const problemDatabase = {
    'startup_failure': {
      name: '启动失败',
      commonCauses: [
        '端口被占用',
        'Java版本不兼容',
        '配置文件错误',
        '数据库连接失败',
        '内存不足'
      ],
      diagnosticSteps: [
        {
          step: '检查Java环境',
          commands: ['java -version', 'echo $JAVA_HOME'],
          expectedOutput: 'Java 1.8 或更高版本',
          troubleshooting: [
            '确保安装了正确的Java版本',
            '设置JAVA_HOME环境变量',
            '检查PATH环境变量'
          ]
        },
        {
          step: '检查端口占用',
          commands: ['netstat -tlnp | grep :8080', 'lsof -i :8080'],
          expectedOutput: '端口未被占用或被正确的进程占用',
          troubleshooting: [
            '杀死占用端口的进程: kill -9 <PID>',
            '修改配置文件中的端口号',
            '使用其他可用端口'
          ]
        },
        {
          step: '检查配置文件',
          commands: ['cat application.yml', 'grep -n "error\\|Error" logs/*.log'],
          expectedOutput: '配置文件格式正确，无语法错误',
          troubleshooting: [
            '验证YAML格式是否正确',
            '检查数据库连接配置',
            '确认Redis配置正确'
          ]
        },
        {
          step: '检查日志文件',
          commands: ['tail -f logs/spring.log', 'grep -i "exception\\|error" logs/*.log'],
          expectedOutput: '无严重错误信息',
          troubleshooting: [
            '根据错误信息定位问题',
            '检查堆栈跟踪信息',
            '查看完整的启动日志'
          ]
        }
      ]
    },
    
    'connection_refused': {
      name: '无法访问/连接被拒绝',
      commonCauses: [
        '防火墙阻止连接',
        '服务未启动',
        'Nginx配置错误',
        '域名解析问题'
      ],
      diagnosticSteps: [
        {
          step: '检查服务状态',
          commands: ['ps aux | grep java', 'systemctl status aikanpro'],
          expectedOutput: '服务正在运行',
          troubleshooting: [
            '启动服务: systemctl start aikanpro',
            '检查服务配置文件',
            '查看服务启动日志'
          ]
        },
        {
          step: '检查防火墙',
          commands: ['systemctl status firewalld', 'firewall-cmd --list-ports'],
          expectedOutput: '相关端口已开放',
          troubleshooting: [
            '开放端口: firewall-cmd --permanent --add-port=8080/tcp',
            '重载防火墙: firewall-cmd --reload',
            '临时关闭防火墙测试: systemctl stop firewalld'
          ]
        },
        {
          step: '检查网络连接',
          commands: ['curl -I http://localhost:8080', 'telnet localhost 8080'],
          expectedOutput: '能够连接到本地服务',
          troubleshooting: [
            '检查本地连接是否正常',
            '测试外网访问',
            '检查路由和DNS设置'
          ]
        },
        {
          step: '检查Nginx配置',
          commands: ['nginx -t', 'systemctl status nginx'],
          expectedOutput: 'Nginx配置正确且服务运行',
          troubleshooting: [
            '修复Nginx配置错误',
            '重启Nginx: systemctl restart nginx',
            '检查upstream配置'
          ]
        }
      ]
    },
    
    'database_error': {
      name: '数据库连接错误',
      commonCauses: [
        'MySQL服务未启动',
        '连接参数错误',
        '用户权限不足',
        '防火墙阻止连接'
      ],
      diagnosticSteps: [
        {
          step: '检查MySQL服务',
          commands: ['systemctl status mysql', 'systemctl status mysqld'],
          expectedOutput: 'MySQL服务正在运行',
          troubleshooting: [
            '启动MySQL: systemctl start mysql',
            '设置开机自启: systemctl enable mysql',
            '检查MySQL配置文件'
          ]
        },
        {
          step: '测试数据库连接',
          commands: ['mysql -h localhost -u root -p', 'mysqladmin ping'],
          expectedOutput: '能够成功连接数据库',
          troubleshooting: [
            '检查用户名和密码',
            '确认数据库存在',
            '检查主机地址和端口'
          ]
        },
        {
          step: '检查用户权限',
          commands: ['SHOW GRANTS FOR \'username\'@\'%\';', 'SELECT user,host FROM mysql.user;'],
          expectedOutput: '用户具有足够的权限',
          troubleshooting: [
            '创建用户: CREATE USER \'username\'@\'%\' IDENTIFIED BY \'password\';',
            '授权: GRANT ALL PRIVILEGES ON database.* TO \'username\'@\'%\';',
            '刷新权限: FLUSH PRIVILEGES;'
          ]
        }
      ]
    },
    
    'upload_failure': {
      name: '文件上传失败',
      commonCauses: [
        '存储配置错误',
        '权限不足',
        '磁盘空间不足',
        '文件大小超限'
      ],
      diagnosticSteps: [
        {
          step: '检查存储配置',
          commands: ['cat config/storage.yml', 'ls -la upload/'],
          expectedOutput: '存储配置正确，目录存在',
          troubleshooting: [
            '验证云存储密钥',
            '检查存储桶配置',
            '测试存储连接'
          ]
        },
        {
          step: '检查文件权限',
          commands: ['ls -la upload/', 'whoami', 'groups'],
          expectedOutput: '具有读写权限',
          troubleshooting: [
            '修改目录权限: chmod 755 upload/',
            '修改所有者: chown -R user:group upload/',
            '检查SELinux设置'
          ]
        },
        {
          step: '检查磁盘空间',
          commands: ['df -h', 'du -sh upload/'],
          expectedOutput: '有足够的磁盘空间',
          troubleshooting: [
            '清理临时文件',
            '扩容磁盘',
            '配置文件清理策略'
          ]
        }
      ]
    },
    
    'performance_slow': {
      name: '系统运行缓慢',
      commonCauses: [
        '内存不足',
        'CPU使用率过高',
        '数据库查询慢',
        '网络延迟'
      ],
      diagnosticSteps: [
        {
          step: '检查系统资源',
          commands: ['top', 'free -h', 'iostat'],
          expectedOutput: '系统资源使用正常',
          troubleshooting: [
            '优化JVM内存设置',
            '增加服务器配置',
            '优化应用程序'
          ]
        },
        {
          step: '检查数据库性能',
          commands: ['SHOW PROCESSLIST;', 'SHOW STATUS LIKE \'Slow_queries\';'],
          expectedOutput: '无慢查询或长时间运行的查询',
          troubleshooting: [
            '优化SQL查询',
            '添加数据库索引',
            '调整数据库配置'
          ]
        },
        {
          step: '检查应用日志',
          commands: ['grep -i "slow\\|timeout" logs/*.log', 'tail -f logs/performance.log'],
          expectedOutput: '无性能相关警告',
          troubleshooting: [
            '分析慢请求',
            '优化代码逻辑',
            '增加缓存机制'
          ]
        }
      ]
    }
  };
  
  const selectedProblem = problemDatabase[problem] || {
    name: '未知问题',
    commonCauses: ['需要更多信息来诊断问题'],
    diagnosticSteps: []
  };
  
  // 根据症状调整诊断步骤
  const customizedSteps = customizeDiagnosticSteps(selectedProblem.diagnosticSteps, symptoms, environment);
  
  return {
    problemName: selectedProblem.name,
    commonCauses: selectedProblem.commonCauses,
    diagnosticSteps: customizedSteps,
    quickFixes: generateQuickFixes(problem, symptoms),
    preventiveMeasures: generatePreventiveMeasures(problem),
    severity: assessSeverity(problem, symptoms),
    estimatedTime: estimateResolutionTime(problem, symptoms)
  };
}

function customizeDiagnosticSteps(steps, symptoms, environment) {
  return steps.map(step => {
    // 根据环境调整命令
    if (environment.os === 'ubuntu') {
      step.commands = step.commands.map(cmd => 
        cmd.replace('systemctl status mysql', 'systemctl status mysql')
           .replace('firewall-cmd', 'ufw')
      );
    }
    
    // 根据症状添加特定检查
    if (symptoms.includes('out_of_memory')) {
      if (step.step === '检查系统资源') {
        step.commands.push('dmesg | grep -i "killed process"');
        step.troubleshooting.push('增加JVM堆内存大小');
      }
    }
    
    return step;
  });
}

function generateQuickFixes(problem, symptoms) {
  const quickFixes = {
    'startup_failure': [
      '重启服务: systemctl restart aikanpro',
      '检查并修复配置文件',
      '清理临时文件和日志'
    ],
    'connection_refused': [
      '重启Nginx: systemctl restart nginx',
      '临时开放防火墙端口',
      '检查服务是否正在运行'
    ],
    'database_error': [
      '重启MySQL服务',
      '检查数据库连接配置',
      '验证用户权限'
    ],
    'upload_failure': [
      '检查上传目录权限',
      '清理临时上传文件',
      '验证存储配置'
    ],
    'performance_slow': [
      '重启应用服务',
      '清理系统缓存',
      '检查系统资源使用'
    ]
  };
  
  return quickFixes[problem] || ['联系技术支持获取帮助'];
}

function generatePreventiveMeasures(problem) {
  const measures = {
    'startup_failure': [
      '定期备份配置文件',
      '设置健康检查监控',
      '建立标准化部署流程'
    ],
    'connection_refused': [
      '配置监控告警',
      '定期检查防火墙规则',
      '建立负载均衡'
    ],
    'database_error': [
      '设置数据库监控',
      '定期备份数据库',
      '配置主从复制'
    ],
    'upload_failure': [
      '监控存储空间使用',
      '设置文件清理策略',
      '配置多存储源'
    ],
    'performance_slow': [
      '建立性能监控',
      '定期优化数据库',
      '配置缓存策略'
    ]
  };
  
  return measures[problem] || ['建立完善的监控体系'];
}

function assessSeverity(problem, symptoms) {
  const severityMap = {
    'startup_failure': 'high',
    'connection_refused': 'high',
    'database_error': 'high',
    'upload_failure': 'medium',
    'performance_slow': 'medium'
  };
  
  let severity = severityMap[problem] || 'low';
  
  // 根据症状调整严重程度
  if (symptoms.includes('data_loss')) severity = 'critical';
  if (symptoms.includes('security_breach')) severity = 'critical';
  if (symptoms.includes('complete_outage')) severity = 'critical';
  
  return severity;
}

function estimateResolutionTime(problem, symptoms) {
  const baseTime = {
    'startup_failure': 30,
    'connection_refused': 20,
    'database_error': 45,
    'upload_failure': 15,
    'performance_slow': 60
  };
  
  let time = baseTime[problem] || 30;
  
  // 根据症状调整时间
  if (symptoms.includes('complex_configuration')) time *= 2;
  if (symptoms.includes('hardware_issue')) time *= 3;
  if (symptoms.includes('data_corruption')) time *= 4;
  
  return `${time}-${time * 2} 分钟`;
}

// 获取所有可用的问题类型
export const onRequestGet = async () => {
  const problemTypes = [
    { id: 'startup_failure', name: '启动失败', description: '应用程序无法正常启动' },
    { id: 'connection_refused', name: '无法访问', description: '无法连接到服务或网站' },
    { id: 'database_error', name: '数据库错误', description: '数据库连接或查询问题' },
    { id: 'upload_failure', name: '上传失败', description: '文件或图片上传失败' },
    { id: 'performance_slow', name: '运行缓慢', description: '系统响应速度慢' }
  ];
  
  const commonSymptoms = [
    'out_of_memory', 'high_cpu', 'disk_full', 'network_timeout',
    'permission_denied', 'config_error', 'service_down', 'data_corruption'
  ];
  
  return new Response(JSON.stringify({
    problemTypes,
    commonSymptoms,
    usage: 'POST /api/troubleshoot with { problem, symptoms, environment }'
  }), {
    status: 200,
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};