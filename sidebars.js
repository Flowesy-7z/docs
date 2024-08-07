/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    // By default, Docusaurus generates a sidebar from the docs folder structure

    // docsSidebar: [{type: 'autogenerated', dirName: '.'}],

    docsSidebar: [
        {
            type: 'html',
            value: '<div class="wwads-cn wwads-horizontal" data-id="235" style="max-width:350px"></div>', // 要渲染的 HTML
            defaultStyle: true, // 使用默认的菜单项目样式
        },
        'intro',   
   {
            type: 'doc',
            label: '许可协议 / 免责声明',
            id: 'UserGS'
        },
        {
            type: 'category',
            label: '快速安装（必看）',
            // collapsed: false,
            items: [
                {
                    type: 'category',
                    label: '开源版（AikanFree）',
                    collapsed: false,
                    link: {
                        type: 'generated-index',
                        title: '开源版部署教程',
                        description: '点击查看不同环境下的部署教程',
                        slug: '/install-os'
                    },
                    items: [
                        {
                            id: 'install/Free-AikanFreeApi',
                            type: 'doc',
                            label: '1、安装AikanFreeAPI'
                        },
                        {
                            id: 'install/Free-AikanFree',
                            type: 'doc',
                            label: '2、安装AikanFree（后台）'
                        },
                       
                        {
                            id: 'install/Free-AikanFreeApp',
                            type: 'doc',
                            label: '3、打包AikanFreeApp'
                        },
                        {
                            id: 'install/Pro-AikanProImg',
                            type: 'doc',
                            label: '4、设置图片上传'
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Pro 版（AikanPro）',
                    collapsed: false,
                    link: {
                        type: 'generated-index',
                        title: 'Pro版部署教程',
                        description: '点击查看不同环境下的部署教程，请按照自上而下的顺序安装',
                        slug: '/install-pro'
                    },
                    items: [
                        {
                            id: 'install/Pro-AikanProAPI',
                            type: 'doc',
                            label: '1、安装AikanProAPI'
                        },
                        {
                            id: 'install/Pro-AikanPro',
                            type: 'doc',
                            label: '2、安装AikanPro（后台）'
                        },
                       
                        {
                            id: 'install/Pro-AikanProApp',
                            type: 'doc',
                            label: '3、打包AikanProApp'
                        },
                        {
                            id: 'install/Pro-AikanProImg',
                            type: 'doc',
                            label: '4、设置图片上传'
                        },
                    ]
                }, {
                    type: 'doc',
                    label: '帮我安装',
                    id: 'support/support'
                }
            ],
        },

        {
            type: 'category',
            label: '程序介绍',
            items: [
               
                 {
                    id: 'feature/product',
                    type: 'doc',
                    label: '产品特色'
                },
                {
                    id: 'feature/intr',
                    type: 'doc',
                    label: '实图介绍'
                },
                {
                    id: 'feature/text',
                    type: 'doc',
                    label: '更新计划'
                }
               
               

            
            ]
        },
        {
            type: 'category',
            label: '配置文件（必看）',
            items: [
               
                {
                    id: 'config/config-port',
                    type: 'doc',
                    label: '启动端口'
                },
                {
                    id: 'config/config-db',
                    type: 'doc',
                    label: '数据库配置'
                },
                {
                    id: 'config/config-debug',
                    type: 'doc',
                    label: '抢救模式'
                }
            ]
        },
        {
            type: 'category',
            label: '高级功能',
            items: [
               
                {
                    id: 'advanced/api',
                    type: 'doc',
                    label: 'API命令表'
                },
                {
                    id: 'advanced/icon',
                    type: 'doc',
                    label: '图标跳转配置教程'
                },
                {
                    id: 'advanced/adve',
                    type: 'doc',
                    label: '激励广告'
                },
               { 
                    id: 'advanced/push',
                    type: 'doc',
                    label: '消息推送'
                }
            ]
        },
        {
            type: 'category',
            label: '常见问题',
            items: [
                {
                    id: 'question/run-multiple-instance',
                    type: 'doc',
                    label: '如何运行多个AikanPro实例？'
                },
               
                {
                    id: 'question/reset-password',
                    type: 'doc',
                    label: '忘记管理员密码怎么办？'
                },
                {
                    id: 'question/start-fail',
                    type: 'doc',
                    label: '启动失败/无法访问怎么办？'
                },
                {
                    id: 'question/bind-domain',
                    type: 'doc',
                    label: '如何用域名访问？'
                },
               
                {
                    id: 'question/upload-fail-baota',
                    type: 'doc',
                    label: '媒体上传失败怎么办？'
                },

                {
                    id: 'question/download-log',
                    type: 'doc',
                    label: '如何查看/下载日志？'
                },
                {
                    id: 'question/sg15',
                    type: 'doc',
                    label: '如何升级SG15'
                }
            ]
        },
   
        {
            type: 'category',
            label: '图片上传配置',
            link: {
                description: "如果你不知道怎么配置存储源，可以点击下方你想添加的存储类型查看详细文档，这里只做展示用",
                type: 'generated-index',
            },
            items: [
                {
                    id: 'example/oss',
                    type: 'doc',
                    label: '阿里云 OSS'
                },
                {
                    id: 'example/cos',
                    type: 'doc',
                    label: '腾讯云 COS'
                },
                {
                    id: 'example/obs',
                    type: 'doc',
                    label: '华为云 OBS'
                },
               
                {
                    id: 'example/qiniu',
                    type: 'doc',
                    label: '七牛云'
                },    

             
                {
                    id: 'example/ftp',
                    type: 'doc',
                    label: 'FTP'
                },
                {
                    id: 'example/sftp',
                    type: 'doc',
                    label: 'SFTP'
                },
            ]
        },
        {
            type: 'category',
            label: '自定义代码示例',
            link: {
                type: 'generated-index',
                title: '自定义 JS 相关示例',
                description: '点击下方查看不同版本的更新日志',
                slug: '/custom-js'
            },
            items: [
              
                {
                    id: 'custom-js/baidu-tongji',
                    type: 'doc',
                    label: '百度统计'
                }
            ]
        },
        {
            type: 'category',
            label: '更新日志',
            link: {
                type: 'generated-index',
                title: '更新日志',
                description: '点击下方查看不同版本的更新日志',
                slug: '/changelog'
            },
            items: [
                {
                    id: 'changelog/os',
                    type: 'doc',
                    label: '开源版'
                },
                {
                    id: 'changelog/pro',
                    type: 'doc',
                    label: 'Pro 版'
                }
            ]
        },
        {
            type: 'doc',
            label: '服务器推荐',
            id: 'ad/ad'
        },
        {
            type: 'doc',
            label: '技术支持',
            id: 'support/support'
        }
    ],

};

module.exports = sidebars;
