
const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package');

const outDir = process.env.RUNTYPER ? '.runtyper' : 'dist';
const runtyper = process.env.RUNTYPER ? ['babel-plugin-runtyper', {
  warnLevel: 'break',
  implicitAddStringNumber: 'allow',
}] : null;
const babelPlugins = [runtyper].filter(Boolean);
const outFile = path.basename(packageJson.main);

module.exports = {
  entry: './src',
  output: {
    path: path.resolve(outDir),
    filename: outFile,
    libraryTarget: 'umd',
    library: 'Fetchers',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: babelPlugins,
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(`${packageJson.name} v${packageJson.version}`)
  ]
};
