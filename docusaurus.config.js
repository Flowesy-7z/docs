 // @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: '我爱看',
    tagline: 'aikan 在线云盘文档',
    url: 'http://docs.qxzhi.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'Flowesy-7z', // Usually your GitHub org/user name.
    projectName: 'AikanPro', // Usually your repo name.
    i18n: {
        defaultLocale: "zh-Hans",
        locales: ["zh-Hans"],
    },
    scripts: [{
        src: '/script/script.js', async: true,
    }, {
        src: 'https://cdn.wwads.cn/js/makemoney.js',
        async: true,
        type: 'text/javascript',
        charset: 'UTF-8',
    }],
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    routeBasePath: "/",
                    showLastUpdateTime: true,
                    showLastUpdateAuthor: true,
                    editUrl: 'https://qxzhi.com',
                },
                blog: false,
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {
                    changefreq: "weekly",
                    priority: 0.5,
                },
            }),
        ],
    ],
    plugins: ['docusaurus-tailwindcss-loader', 'docusaurus-plugin-image-zoom'],
    themes: ['@docusaurus/theme-live-codeblock', [
        require.resolve("@easyops-cn/docusaurus-search-local"),
        {
            // ... Your options.
            // `hashed` is recommended as long-term-cache of index file is possible.
            hashed: true,
            indexBlog: false,
            language: ["en", "zh"],
            docsRouteBasePath: '/',
            highlightSearchTermsOnTargetPage: true,
            explicitSearchResultPath: true,
        }
    ]
    ],
    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            zoom: {
                selector: '.markdown img',
                background: {
                    light: 'rgb(255, 255, 255)',
                    dark: 'rgb(50, 50, 50)'
                },
                // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
                config: {}
            },
            docs: {
                sidebar: {
                    hideable: true,
                    autoCollapseCategories: true,
                },
            },
            colorMode: {
                disableSwitch: false,
                respectPrefersColorScheme: true,
            },
            navbar: {
                title: 'aikan',
                logo: {
                    alt: '我爱看',
                    src: 'img/aikan.png',
                },
                items: [
                    {
                        href: "https://qxzhi.com",
                        label: "PC演示站",
                    },
                    {
                        "label": "移动端演示站",
                        "href": "https://m.qxzhi.com"
                    },
                    {
                        type: "dropdown",
                        label: "QQ 交流群",
                        items: [
                            {
                                "label": "QQ 交流群",
                                "href": "http://yl.qxzhi.com/liuli"
                            },
                            {
                                "label": "QQ 交流群",
                               "href": "http://yl.qxzhi.com/liuli"
                            },
                        ]
                    },
                    {
                        "label": "服务器推荐✨",
                        "href": "/ad/"
                    },
                    {
                        "label": "我要提 BUG",
                        "href": "https://qxzhi.com"
                    },
                    {
                        "label": "技术支持",
                        "href": "/support/"
                    },
                    {
                        href: 'https://qxzhi.com',
                        position: 'right',
                        className: 'header-github-link'
                    }
                ]
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: '关于',
                        items: [
                            {
                                label: '官网',
                                 to: 'https://qxzhi.com',
                            },
                           
                            {
                                label: 'Github (文档)',
                                to: 'https://docs.qxzhi.com',
                            }
                        ],
                    },
                    {
                        title: '社区',
                        items: [
                            {
                                label: 'QQ 群',
                                href: 'http://yl.qxzhi.com/liuli',
                            },
                           
                        ],
                    }
                ],
                copyright: `Copyright © ${new Date().getFullYear()} AikanPro, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['bash', 'properties'],
                magicComments: [
                    // 要记得复制默认的高亮类！
                    {
                        className: 'theme-code-block-highlighted-line',
                        line: 'highlight-next-line',
                        block: {start: 'highlight-start', end: 'highlight-end'},
                    },
                    {
                        className: 'code-block-primary-line',
                        line: 'highlight blue next',
                    },
                    {
                        className: 'code-block-warning-line',
                        line: 'highlight yellow next',
                    },
                ]
            },
        }),
};

module.exports = config;
