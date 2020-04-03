const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')[utils.argv()]
const path = require('path')
const merge = require('webpack-merge')
const cssLoader = require('./css-loader.conf')
const baseWebpackConfig = require('./webpack.base.conf')

const env_build = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: cssLoader.styleLoaders({
      sourceMap: config.cssSourceMap
    })
  },
  devtool: false,
  
  entry: path.resolve(__dirname, '../lib/index.js'),

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'upload-ui.js',
    library: 'upload-ui',
    libraryTarget: 'umd',
  },

  externals: {
    vue: 'vue'
  },

  plugins: [
    // 设置默认环境变量
    new webpack.DefinePlugin({
      'process.env': env_build
    }),
  ]
})

module.exports = webpackConfig