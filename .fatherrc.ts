export default {
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
  cjs: 'babel',
  disableTypeCheck: true,
  extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],
};
