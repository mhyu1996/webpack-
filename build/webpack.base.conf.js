'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const { VueLoaderPlugin } = require('vue-loader')
const vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack")
const HappyPack = require('happypack');
const os = require('os');
const projectConfig = require('../config/projectConfig');
 // 设置进程池
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  // externals: {
    // 'CKEDITOR': 'window.CKEDITOR'
  //   'CKEDITOR': '@ckeditor\ckeditor5-build-classic'
  // },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'vue': 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happyBabel',
        //排除node_modules 目录下的文件
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client'),
          resolve('node_modules/codemirror/addon'),
          resolve('node_modules/codemirror/mode')
        ]
      }],
      debug:true,
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "windows.jQuery": "jquery"
    // })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  optimization : (function () {
    let obj = {
      splitChunks: {
        chunks: 'all',
        minSize:1000,
        cacheGroups: {
          libs: {
            name: 'libs',
            test:(module) => {
              return /node_modules/.test(module.context);
            },
            priority: 10,
            chunks: 'initial' // 只打包初始时依赖的第三方
          },
          otherViews:{
            name: 'other-views',
            priority: 20, // 权重
            test: (module) => {
              let v = '(' + projectConfig + ')',//非当前要打包的项目
                re = new RegExp(v),
                bool = false;
              if (!re.test(module.context)) {
                bool = true;
                console.log('【***package otherViews***】【filePath='+module.context+'】');
              }
              return bool;
            },
            reuseExistingChunk:true,
          }
        }
      },
      runtimeChunk: 'single',
      // minimizer: [
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       mangle: {
      //         safari10: true
      //       }
      //     },
      //     sourceMap: config.build.productionSourceMap,
      //     cache: true,
      //     parallel: true
      //   }),
      //   // Compress extracted CSS. We are using this plugin so that possible
      //   // duplicated CSS from different components can be deduped.
      //   new OptimizeCSSAssetsPlugin()
      // ]
    }
    if (projectConfig && projectConfig.indexOf('|') > -1) {
      let views = projectConfig.split('|');
      for (let view of views) {
        obj.splitChunks.cacheGroups[view] = {
          name: view+'-views',
          priority: 30, // 权重
          test: (module) => {
            let v =  view,//当前要打包的项目
              re = new RegExp(v),
              bool = false;
            if (re.test(module.context)) {
              bool = true;
              console.log('【***package ' + view + '-views***】【filePath='+module.context+'】');
            }
            return bool;
          },
          reuseExistingChunk:true,
        };
      }
    } else {
      obj.splitChunks.cacheGroups[projectConfig] = {
        name: projectConfig+'-views',
        priority: 30, // 权重
        test: (module) => {
          let v = projectConfig,//当前要打包的项目
            re = new RegExp(v),
            bool = false;
          if (re.test(module.context)) {
            bool = true;
            console.log('【***package ' + projectConfig + '-views***】【filePath='+module.context+'】');
          }
          return bool;
        },
        reuseExistingChunk:true,
      };
    }
    return obj;
  })()
  // optimization:
}
