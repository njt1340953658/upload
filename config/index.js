const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/hack/', // 设置启动后访问路径前缀
    proxyTable: {}, // 代理
    // devserver 所需配置
    host: 'localhost', // ip
    // host: '172.24.83.9',
    port: 9000, // 端口
    notifyOnErrors: true, // 是否显示消息提示信息
    openPage: 'hack', // 自动打开页面
    // Source Maps
    devtool: 'cheap-module-eval-source-map',
  },
  build: {
    // 编译的文件入口地址
    index: path.resolve(__dirname, '../output/index.html'),
    // 打包输出path 
    assetsRoot: path.resolve(__dirname, '../output'), // 打包后的地址
    assetsSubDirectory: 'static', // 静态目录拷贝出的存放地址
    assetsPublicPath: '/hack/', // 打包后的目录地址
    assetsPublicPathDll: '/hack/', // 打包后的dll引用地址
    // 是否启用source map source类型
    productionSourceMap: true,
    devtool: '#source-map',
    // 文件压缩是否启用gizp和匹配文件
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // 是否启用蓝图 - 查看打包细节
    bundleAnalyzerReport: process.env.npm_config_report
  },
}
