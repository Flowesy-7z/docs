// EdgeOne Pages 部署配置
module.exports = {
  // 构建配置
  build: {
    command: 'npm run build',
    outputDirectory: 'build',
    environment: {
      NODE_VERSION: '18',
      NPM_VERSION: '9'
    }
  },
  
  // Node Functions 配置
  functions: {
    directory: 'node-functions',
    runtime: 'nodejs18.x'
  },
  
  // 路由配置
  routes: [
    // API 路由
    {
      src: '/api/(.*)',
      dest: '/node-functions/api/$1'
    },
    // 静态文件路由
    {
      src: '/static/(.*)',
      dest: '/build/static/$1'
    },
    // 图片资源路由
    {
      src: '/img/(.*)',
      dest: '/build/img/$1'
    },
    // 脚本资源路由
    {
      src: '/script/(.*)',
      dest: '/build/script/$1'
    },
    // 默认路由到 Docusaurus
    {
      src: '/(.*)',
      dest: '/build/$1'
    }
  ],
  
  // 头部配置
  headers: [
    {
      src: '/api/(.*)',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: '*'
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET, POST, PUT, DELETE, OPTIONS'
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type, Authorization'
        }
      ]
    },
    {
      src: '/static/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ],
  
  // 重定向配置
  redirects: [
    {
      src: '/docs/(.*)',
      dest: '/$1',
      permanent: true
    }
  ]
};