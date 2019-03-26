const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  transpileDependencies: ['element-ui'],

  chainWebpack: (config) => {
    config.module.rules.delete('svg')
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    if (process.env.NODE_ENV === 'production') {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
        // ...webpack-bundle-analyzer options here
      }])
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_PROXY_TARGET,
        ws: true,
        changeOrigin: true
      },
      '/socketio': {
        target: process.env.VUE_APP_PROXY_TARGET,
        ws: true,
        changeOrigin: true
      }
    }
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // config.output.publicPath = 'https://cdn.runighcat.com/'
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // 只打包初始时依赖的第三方
          },
          elementUI: {
            name: 'chunk-mintUI', // 单独将 elementUI 拆包
            priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
            test: /[\\/]node_modules[\\/]mint-ui[\\/]/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // 可自定义拓展你的规则
            minChunks: 3, // 最小公用次数
            priority: 5,
            reuseExistingChunk: true
          }
        }
      }
    } else {
      // mutate for development...
    }
  },

  lintOnSave: undefined
}
