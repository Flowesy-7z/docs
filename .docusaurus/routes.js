import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '822'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '62c'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'fe7'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'a49'),
            routes: [
              {
                path: '/待完善/os-baota',
                component: ComponentCreator('/待完善/os-baota', '655'),
                exact: true
              },
              {
                path: '/待完善/os-windows',
                component: ComponentCreator('/待完善/os-windows', 'e96'),
                exact: true
              },
              {
                path: '/待完善/pro-baota',
                component: ComponentCreator('/待完善/pro-baota', 'b2c'),
                exact: true
              },
              {
                path: '/待完善/pro-linux',
                component: ComponentCreator('/待完善/pro-linux', '2c5'),
                exact: true
              },
              {
                path: '/待完善/pro-windows',
                component: ComponentCreator('/待完善/pro-windows', '54f'),
                exact: true
              },
              {
                path: '/ad/',
                component: ComponentCreator('/ad/', '17e'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/advanced/1',
                component: ComponentCreator('/advanced/1', 'f31'),
                exact: true
              },
              {
                path: '/advanced/adve',
                component: ComponentCreator('/advanced/adve', '82b'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/advanced/api',
                component: ComponentCreator('/advanced/api', '6a9'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/advanced/icon',
                component: ComponentCreator('/advanced/icon', '7c3'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/advanced/img_public',
                component: ComponentCreator('/advanced/img_public', '178'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/advanced/push',
                component: ComponentCreator('/advanced/push', '11b'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/category/常见问题',
                component: ComponentCreator('/category/常见问题', '4e5'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/category/程序介绍',
                component: ComponentCreator('/category/程序介绍', '573'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/category/高级功能',
                component: ComponentCreator('/category/高级功能', '190'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/category/快速安装必看',
                component: ComponentCreator('/category/快速安装必看', 'c38'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/category/配置文件必看',
                component: ComponentCreator('/category/配置文件必看', '004'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/category/图片上传配置',
                component: ComponentCreator('/category/图片上传配置', '3d4'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/changelog',
                component: ComponentCreator('/changelog', '21d'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/changelog/os',
                component: ComponentCreator('/changelog/os', '521'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/changelog/pro',
                component: ComponentCreator('/changelog/pro', 'ec2'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/config/config-db',
                component: ComponentCreator('/config/config-db', 'bbe'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/config/config-debug',
                component: ComponentCreator('/config/config-debug', '59b'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/config/config-port',
                component: ComponentCreator('/config/config-port', '777'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/custom-js',
                component: ComponentCreator('/custom-js', '89c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/custom-js/baidu-tongji',
                component: ComponentCreator('/custom-js/baidu-tongji', '627'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/example/cos',
                component: ComponentCreator('/example/cos', '1f2'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/example/ftp',
                component: ComponentCreator('/example/ftp', '22c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/example/obs',
                component: ComponentCreator('/example/obs', 'c63'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/example/oss',
                component: ComponentCreator('/example/oss', '13e'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/example/qiniu',
                component: ComponentCreator('/example/qiniu', '941'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/example/sftp',
                component: ComponentCreator('/example/sftp', 'ad2'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/feature/intr',
                component: ComponentCreator('/feature/intr', 'db0'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/feature/product',
                component: ComponentCreator('/feature/product', '49d'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/feature/text',
                component: ComponentCreator('/feature/text', 'f10'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/install-os',
                component: ComponentCreator('/install-os', 'bdd'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/install-pro',
                component: ComponentCreator('/install-pro', '9dd'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/install/Free-AikanFree',
                component: ComponentCreator('/install/Free-AikanFree', '7db'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/install/Free-AikanFreeApi',
                component: ComponentCreator('/install/Free-AikanFreeApi', '13c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/install/Free-AikanFreeApp',
                component: ComponentCreator('/install/Free-AikanFreeApp', 'ce8'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/install/Pro-AikanPro',
                component: ComponentCreator('/install/Pro-AikanPro', 'c8e'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/install/Pro-AikanProAPI',
                component: ComponentCreator('/install/Pro-AikanProAPI', 'd30'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/install/Pro-AikanProApp',
                component: ComponentCreator('/install/Pro-AikanProApp', '7a6'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/install/Pro-AikanProImg',
                component: ComponentCreator('/install/Pro-AikanProImg', '451'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/question/bind-domain',
                component: ComponentCreator('/question/bind-domain', 'd3c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/question/download-log',
                component: ComponentCreator('/question/download-log', '994'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/question/reset-password',
                component: ComponentCreator('/question/reset-password', '7cf'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/question/run-multiple-instance',
                component: ComponentCreator('/question/run-multiple-instance', '6b6'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/question/sg15',
                component: ComponentCreator('/question/sg15', 'b59'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/question/start-fail',
                component: ComponentCreator('/question/start-fail', '671'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/question/upload-fail-baota',
                component: ComponentCreator('/question/upload-fail-baota', '5b1'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/support',
                component: ComponentCreator('/support', 'c32'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/support/support-pf',
                component: ComponentCreator('/support/support-pf', '4bb'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/support/support-term',
                component: ComponentCreator('/support/support-term', '0f1'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/UserGS',
                component: ComponentCreator('/UserGS', 'b6b'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'be6'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
