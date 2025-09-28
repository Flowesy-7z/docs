// 配置文件生成器 API
// 访问路径: /api/config-generator

export const onRequestPost = async ({ request }) => {
  try {
    const data = await request.json();
    const { type, params } = data;
    
    let config = {};
    
    switch (type) {
      case 'database':
        config = generateDatabaseConfig(params);
        break;
      case 'nginx':
        config = generateNginxConfig(params);
        break;
      case 'application':
        config = generateApplicationConfig(params);
        break;
      case 'docker':
        config = generateDockerConfig(params);
        break;
      default:
        return new Response(JSON.stringify({ error: 'Invalid config type' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
    
    return new Response(JSON.stringify({
      success: true,
      config: config,
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
      error: 'Invalid request data',
      message: error.message 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function generateDatabaseConfig(params) {
  const { host = 'localhost', port = '3306', database = 'aikanpro', username = 'root', password = '' } = params;
  
  return {
    yaml: `spring:
  datasource:
    url: jdbc:mysql://${host}:${port}/${database}?useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2B8
    username: ${username}
    password: ${password}
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
  redis:
    host: ${host}
    port: 6379
    password: 
    database: 0
    timeout: 3000
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0`,
    sql: `-- 创建数据库
CREATE DATABASE IF NOT EXISTS ${database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户并授权
CREATE USER IF NOT EXISTS '${username}'@'%' IDENTIFIED BY '${password}';
GRANT ALL PRIVILEGES ON ${database}.* TO '${username}'@'%';
FLUSH PRIVILEGES;

-- 验证连接
SELECT 'Database connection test successful' as result;`
  };
}

function generateNginxConfig(params) {
  const { domain, apiPort = '8080', adminPort = '8081', h5Port = '8082' } = params;
  
  return {
    config: `# AikanPro Nginx 配置
# API 接口服务
server {
    listen 80;
    server_name api.${domain};
    
    location / {
        proxy_pass http://localhost:${apiPort};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 文件上传大小限制
        client_max_body_size 100M;
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

# 后台管理
server {
    listen 80;
    server_name admin.${domain};
    
    location / {
        proxy_pass http://localhost:${adminPort};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# H5 移动端
server {
    listen 80;
    server_name m.${domain};
    
    location / {
        proxy_pass http://localhost:${h5Port};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# PC 端
server {
    listen 80;
    server_name ${domain};
    
    location / {
        root /var/www/aikanpro-pc;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}`
  };
}

function generateApplicationConfig(params) {
  const { serverPort = '8080', profile = 'prod', logLevel = 'INFO' } = params;
  
  return {
    yaml: `server:
  port: ${serverPort}
  servlet:
    context-path: /
  tomcat:
    max-threads: 200
    min-spare-threads: 10

spring:
  profiles:
    active: ${profile}
  application:
    name: aikanpro-api
  servlet:
    multipart:
      max-file-size: 100MB
      max-request-size: 100MB

logging:
  level:
    root: ${logLevel}
    com.aikan: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/aikanpro.log
    max-size: 100MB
    max-history: 30

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: when-authorized`
  };
}

function generateDockerConfig(params) {
  const { javaVersion = '8', appName = 'aikanpro-api', port = '8080' } = params;
  
  return {
    dockerfile: `FROM openjdk:${javaVersion}-jre-alpine

# 设置工作目录
WORKDIR /app

# 复制jar文件
COPY target/${appName}.jar app.jar

# 创建日志目录
RUN mkdir -p /app/logs

# 暴露端口
EXPOSE ${port}

# 设置JVM参数
ENV JAVA_OPTS="-Xms512m -Xmx1024m -XX:+UseG1GC"

# 启动应用
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]`,
    
    dockerCompose: `version: '3.8'

services:
  aikanpro-api:
    build: .
    ports:
      - "${port}:${port}"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - MYSQL_HOST=mysql
      - REDIS_HOST=redis
    depends_on:
      - mysql
      - redis
    volumes:
      - ./logs:/app/logs
      - ./upload:/app/upload
    restart: unless-stopped

  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: root123456
      MYSQL_DATABASE: aikanpro
      MYSQL_USER: aikan
      MYSQL_PASSWORD: aikan123
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./sql:/docker-entrypoint-initdb.d
    restart: unless-stopped

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  mysql_data:
  redis_data:`
  };
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