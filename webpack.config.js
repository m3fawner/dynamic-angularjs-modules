const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEV_SERVER_PORT = 8080;
process.env.NODE_ENV = 'dev';
module.exports = {
  entry: [
    `webpack-dev-server/client?http://localhost:${DEV_SERVER_PORT}`,
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  mode: 'development',
  optimization: {
    nodeEnv: 'development',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: [
          'babel-loader',
        ],
      }
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js']
  },
  devtool: 'eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
    port: DEV_SERVER_PORT,
  },
};
