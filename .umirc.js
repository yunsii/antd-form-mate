export default {
  title: 'antd-form-mate',
  mode: 'site',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  base: '/antd-form-mate',
  publicPath: '/antd-form-mate/',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
};
