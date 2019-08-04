const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: true
            })]
          }),
        },
      },
      // Optional
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    loader: 'babel-loader',
    exclude: /node_modules/,
    test: /\.(js|jsx)$/,
    options: {
      presets: ['@babel/react'],
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ['@babel/plugin-proposal-class-properties'],
        ['import', {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true
        }]
      ]
    },
  });

  config.module.rules.push({
    test: /\.less$/,
    loaders: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }
    ],
    include: [
      path.resolve(__dirname, '../src'),
      /[\\/]node_modules[\\/].*antd/
    ]
  });

  return config;
};
