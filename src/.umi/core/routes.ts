// @ts-nocheck
import { ApplyPluginsType } from '/home/zpr1g/Workspaces/github/antd-form-mate/node_modules/_@umijs_runtime@3.2.3@@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../../node_modules/_@umijs_preset-dumi@1.0.31@@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"antd-form-mate 表单组件","meta":{"order":10}}]}},"locales":[],"navs":{},"title":"antd-form-mate","mode":"site","repoUrl":"https://github.com/zpr1g/antd-form-mate"},
      ...props,
    }),
    "routes": [
      {
        "path": "/",
        "component": require('../../../docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1591711469839,
          "title": "antd-form-mate 表单组件",
          "order": 10,
          "sidemenu": false,
          "slugs": []
        },
        "title": "antd-form-mate 表单组件"
      }
    ],
    "title": "antd-form-mate"
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
