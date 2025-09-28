// 实用工具集合 API
// 访问路径: /api/tools

export const onRequestPost = async ({ request }) => {
  try {
    const data = await request.json();
    const { tool, params } = data;
    
    let result = {};
    
    switch (tool) {
      case 'password-generator':
        result = generatePassword(params);
        break;
      case 'jwt-decoder':
        result = decodeJWT(params);
        break;
      case 'hash-generator':
        result = generateHash(params);
        break;
      case 'url-encoder':
        result = encodeURL(params);
        break;
      case 'base64-converter':
        result = convertBase64(params);
        break;
      case 'json-formatter':
        result = formatJSON(params);
        break;
      case 'sql-generator':
        result = generateSQL(params);
        break;
      case 'cron-parser':
        result = parseCron(params);
        break;
      case 'color-converter':
        result = convertColor(params);
        break;
      case 'qr-generator':
        result = generateQRInfo(params);
        break;
      default:
        return new Response(JSON.stringify({ error: 'Unknown tool' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
    
    return new Response(JSON.stringify({
      success: true,
      tool,
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
      error: 'Tool execution failed',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function generatePassword(params) {
  const { length = 16, includeUppercase = true, includeLowercase = true, includeNumbers = true, includeSymbols = true, excludeSimilar = false } = params;
  
  let charset = '';
  if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (excludeSimilar) {
    charset = charset.replace(/[0O1lI]/g, '');
  }
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  // 计算密码强度
  const strength = calculatePasswordStrength(password);
  
  return {
    password,
    strength,
    length: password.length,
    charset: charset.length,
    entropy: Math.log2(Math.pow(charset.length, password.length)).toFixed(2)
  };
}

function decodeJWT(params) {
  const { token } = params;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }
    
    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    
    // 检查过期时间
    const now = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp && payload.exp < now;
    const expiresIn = payload.exp ? payload.exp - now : null;
    
    return {
      header,
      payload,
      signature: parts[2],
      isExpired,
      expiresIn: expiresIn > 0 ? `${expiresIn} seconds` : null,
      issuedAt: payload.iat ? new Date(payload.iat * 1000).toISOString() : null,
      expiresAt: payload.exp ? new Date(payload.exp * 1000).toISOString() : null
    };
  } catch (error) {
    return { error: 'Invalid JWT token', message: error.message };
  }
}

function generateHash(params) {
  const { text, algorithm = 'sha256' } = params;
  
  // 注意：在实际的 Node.js 环境中，这里会使用 crypto 模块
  // 这里提供一个简化的示例
  const algorithms = ['md5', 'sha1', 'sha256', 'sha512'];
  
  if (!algorithms.includes(algorithm)) {
    return { error: 'Unsupported algorithm' };
  }
  
  // 模拟哈希生成（实际应用中使用 crypto.createHash）
  const mockHash = btoa(text + algorithm).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  return {
    original: text,
    algorithm,
    hash: mockHash,
    length: mockHash.length,
    note: 'This is a mock hash for demonstration. Use crypto module in production.'
  };
}

function encodeURL(params) {
  const { text, operation = 'encode' } = params;
  
  try {
    let result;
    if (operation === 'encode') {
      result = encodeURIComponent(text);
    } else if (operation === 'decode') {
      result = decodeURIComponent(text);
    } else {
      return { error: 'Invalid operation. Use "encode" or "decode"' };
    }
    
    return {
      original: text,
      operation,
      result,
      length: result.length
    };
  } catch (error) {
    return { error: 'URL encoding/decoding failed', message: error.message };
  }
}

function convertBase64(params) {
  const { text, operation = 'encode' } = params;
  
  try {
    let result;
    if (operation === 'encode') {
      result = btoa(unescape(encodeURIComponent(text)));
    } else if (operation === 'decode') {
      result = decodeURIComponent(escape(atob(text)));
    } else {
      return { error: 'Invalid operation. Use "encode" or "decode"' };
    }
    
    return {
      original: text,
      operation,
      result,
      originalLength: text.length,
      resultLength: result.length
    };
  } catch (error) {
    return { error: 'Base64 conversion failed', message: error.message };
  }
}

function formatJSON(params) {
  const { json, operation = 'format' } = params;
  
  try {
    let result;
    const parsed = JSON.parse(json);
    
    if (operation === 'format') {
      result = JSON.stringify(parsed, null, 2);
    } else if (operation === 'minify') {
      result = JSON.stringify(parsed);
    } else if (operation === 'validate') {
      return {
        valid: true,
        formatted: JSON.stringify(parsed, null, 2),
        minified: JSON.stringify(parsed),
        size: json.length,
        keys: Object.keys(parsed).length
      };
    }
    
    return {
      original: json,
      operation,
      result,
      valid: true,
      originalSize: json.length,
      resultSize: result.length
    };
  } catch (error) {
    return { 
      valid: false, 
      error: 'Invalid JSON', 
      message: error.message,
      position: getJSONErrorPosition(error.message)
    };
  }
}

function generateSQL(params) {
  const { operation, tableName, columns, data, conditions } = params;
  
  switch (operation) {
    case 'create':
      return generateCreateTableSQL(tableName, columns);
    case 'insert':
      return generateInsertSQL(tableName, data);
    case 'select':
      return generateSelectSQL(tableName, columns, conditions);
    case 'update':
      return generateUpdateSQL(tableName, data, conditions);
    case 'delete':
      return generateDeleteSQL(tableName, conditions);
    default:
      return { error: 'Invalid SQL operation' };
  }
}

function parseCron(params) {
  const { expression } = params;
  
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5 && parts.length !== 6) {
    return { error: 'Invalid cron expression format' };
  }
  
  const fields = parts.length === 5 
    ? ['minute', 'hour', 'day', 'month', 'weekday']
    : ['second', 'minute', 'hour', 'day', 'month', 'weekday'];
  
  const parsed = {};
  fields.forEach((field, index) => {
    parsed[field] = parts[index];
  });
  
  return {
    expression,
    parsed,
    description: describeCron(parsed),
    nextRuns: getNextCronRuns(expression, 5)
  };
}

function convertColor(params) {
  const { color, fromFormat, toFormat } = params;
  
  // 简化的颜色转换示例
  const conversions = {
    'hex-to-rgb': (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${r}, ${g}, ${b})`;
    },
    'rgb-to-hex': (rgb) => {
      const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (!match) return null;
      const r = parseInt(match[1]).toString(16).padStart(2, '0');
      const g = parseInt(match[2]).toString(16).padStart(2, '0');
      const b = parseInt(match[3]).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    }
  };
  
  const conversionKey = `${fromFormat}-to-${toFormat}`;
  const converter = conversions[conversionKey];
  
  if (!converter) {
    return { error: 'Unsupported color conversion' };
  }
  
  const result = converter(color);
  return {
    original: color,
    fromFormat,
    toFormat,
    result,
    preview: {
      original: color,
      converted: result
    }
  };
}

function generateQRInfo(params) {
  const { text, size = 200, errorCorrection = 'M' } = params;
  
  // 在实际应用中，这里会生成真实的QR码
  // 这里提供配置信息和建议的库
  return {
    text,
    size,
    errorCorrection,
    url: `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`,
    libraries: [
      'qrcode (Node.js)',
      'qr-code-generator',
      'node-qrcode'
    ],
    formats: ['PNG', 'SVG', 'PDF'],
    errorCorrectionLevels: {
      'L': '~7% correction',
      'M': '~15% correction',
      'Q': '~25% correction',
      'H': '~30% correction'
    }
  };
}

// 辅助函数
function calculatePasswordStrength(password) {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return {
    score,
    level: levels[score] || 'Very Weak',
    percentage: Math.min((score / 6) * 100, 100)
  };
}

function getJSONErrorPosition(message) {
  const match = message.match(/position (\d+)/);
  return match ? parseInt(match[1]) : null;
}

function generateCreateTableSQL(tableName, columns) {
  const columnDefs = columns.map(col => 
    `${col.name} ${col.type}${col.nullable === false ? ' NOT NULL' : ''}${col.primaryKey ? ' PRIMARY KEY' : ''}`
  ).join(',\n  ');
  
  return {
    sql: `CREATE TABLE ${tableName} (\n  ${columnDefs}\n);`,
    type: 'CREATE TABLE'
  };
}

function generateInsertSQL(tableName, data) {
  const columns = Object.keys(data).join(', ');
  const values = Object.values(data).map(v => typeof v === 'string' ? `'${v}'` : v).join(', ');
  
  return {
    sql: `INSERT INTO ${tableName} (${columns}) VALUES (${values});`,
    type: 'INSERT'
  };
}

function generateSelectSQL(tableName, columns = ['*'], conditions = {}) {
  const cols = Array.isArray(columns) ? columns.join(', ') : columns;
  let sql = `SELECT ${cols} FROM ${tableName}`;
  
  if (Object.keys(conditions).length > 0) {
    const where = Object.entries(conditions)
      .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
      .join(' AND ');
    sql += ` WHERE ${where}`;
  }
  
  return {
    sql: sql + ';',
    type: 'SELECT'
  };
}

function generateUpdateSQL(tableName, data, conditions) {
  const sets = Object.entries(data)
    .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
    .join(', ');
  
  const where = Object.entries(conditions)
    .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
    .join(' AND ');
  
  return {
    sql: `UPDATE ${tableName} SET ${sets} WHERE ${where};`,
    type: 'UPDATE'
  };
}

function generateDeleteSQL(tableName, conditions) {
  const where = Object.entries(conditions)
    .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
    .join(' AND ');
  
  return {
    sql: `DELETE FROM ${tableName} WHERE ${where};`,
    type: 'DELETE'
  };
}

function describeCron(parsed) {
  // 简化的cron描述生成
  const { minute, hour, day, month, weekday } = parsed;
  
  if (minute === '0' && hour === '0' && day === '*' && month === '*' && weekday === '*') {
    return 'Every day at midnight';
  }
  if (minute === '0' && hour === '*' && day === '*' && month === '*' && weekday === '*') {
    return 'Every hour';
  }
  if (minute === '*' && hour === '*' && day === '*' && month === '*' && weekday === '*') {
    return 'Every minute';
  }
  
  return `At ${minute} minutes past ${hour} hour(s), on ${day} day(s) of ${month} month(s), on ${weekday} weekday(s)`;
}

function getNextCronRuns(expression, count) {
  // 在实际应用中，这里会使用cron解析库计算下次运行时间
  // 这里返回模拟数据
  const now = new Date();
  const runs = [];
  
  for (let i = 1; i <= count; i++) {
    const nextRun = new Date(now.getTime() + i * 60 * 60 * 1000); // 每小时一次的示例
    runs.push(nextRun.toISOString());
  }
  
  return runs;
}

// 获取所有可用工具
export const onRequestGet = async () => {
  const tools = [
    { id: 'password-generator', name: '密码生成器', description: '生成安全密码' },
    { id: 'jwt-decoder', name: 'JWT解码器', description: '解码JWT令牌' },
    { id: 'hash-generator', name: '哈希生成器', description: '生成文本哈希值' },
    { id: 'url-encoder', name: 'URL编码器', description: 'URL编码/解码' },
    { id: 'base64-converter', name: 'Base64转换器', description: 'Base64编码/解码' },
    { id: 'json-formatter', name: 'JSON格式化器', description: '格式化和验证JSON' },
    { id: 'sql-generator', name: 'SQL生成器', description: '生成SQL语句' },
    { id: 'cron-parser', name: 'Cron解析器', description: '解析cron表达式' },
    { id: 'color-converter', name: '颜色转换器', description: '颜色格式转换' },
    { id: 'qr-generator', name: 'QR码生成器', description: '生成QR码信息' }
  ];
  
  return new Response(JSON.stringify({
    tools,
    usage: 'POST /api/tools with { tool, params }'
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