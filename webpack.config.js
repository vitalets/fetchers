
const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package');

const target = process.env.TARGET || 'es2017';
module.exports = createConfig(target);

function createConfig(target) {
  const outDir = path.join('dist', target);
  const outFile = path.basename(packageJson.main);
  return {
    entry: [
      target === 'es5' ? 'babel-regenerator-runtime' : null,
      './src'
    ].filter(Boolean),
    output: {
      path: path.resolve(outDir),
      filename: outFile,
      libraryTarget: 'umd',
      library: 'Fetchers',
    },
    devtool: 'source-map',
    module: {
      rules: [
        target === 'es5' ? getBabelLoader() : null
      ].filter(Boolean)
    },
    plugins: [
      new webpack.BannerPlugin(`${packageJson.name} v${packageJson.version}`)
    ]
  }
}

function getBabelLoader() {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env'],
      }
    }
  };
}
