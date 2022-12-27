const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = {
  entry: {
    color2name: path.resolve(__dirname, 'src/index.ts')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: { extensions: ['.ts', '.tsx'] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].js',
    filename: '[name].js',
    clean: true,
    umdNamedDefine: true,
    globalObject: 'this',
    library: {
      name: 'color2name',
      type: 'umd'
    }
  },
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all'
    },
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ]
  }
}

module.exports = webpackConfig
