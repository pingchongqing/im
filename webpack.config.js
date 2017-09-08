var path = require('path')
var webpack = require('webpack')
//var PrerenderSpaPlugin = require('prerender-spa-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this nessessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'less': 'vue-style-loader!css-loader!less-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: /vue-fancybox/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'], // 后缀名自动补全
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'images': resolve('src/assets/images'),
            'css': resolve('src/assets/css'),
            'js': resolve('src/assets/js'),
            'components': resolve('src/components')
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port: '8083',
        proxy: {
            //'/api/mobile-goodsSearch-service': {
            //    target: 'http://mn.5173.cn',
            //    pathRewrite: {'^/mobile-goodsSearch-service' : '/api/mobile-goodsSearch-service'},
            //    changeOrigin: true
            //},
            //'/api/mobile-category-service': {
            //    target: 'http://mn.5173.cn',
            //    pathRewrite: {'^/mobile-category-service' : '/api/mobile-category-service'},
            //    changeOrigin: true
            //},
            //'/mobile-cate-service': {
            //    target: 'http://mn.5173.cn',
            //    pathRewrite: {'^/mobile-cate-service' : '/mobile-category-service'},
            //    changeOrigin: true
            //},
            //'/api/mobile-goods-service': {
            //    target: 'http://mn.5173.cn',
            //    pathRewrite: {'^/mobile-goods-service' : '/api/mobile-goods-service'},
            //    changeOrigin: true
            //},
            //'/api/mobile-mainGoods-service': {
            //    target: 'http://mn.5173.cn',
            //    pathRewrite: {'^/mobile-mainGoods-service' : '/api/mobile-mainGoods-service'},
            //    changeOrigin: true
            //},
            "/api": {
                target: "https://m.5173.com",
				changeOrigin: true,
			},
             "/BizOfferV2": {
             target: "http://sy.5173.com/",
             changeOrigin: true,
             },
            // "/mobile-category-service": {
            //  target: "http://192.168.40.58:8084",
            //  changeOrigin: true,
            //  pathRewrite: {'^/api/mobile-category-service' : '/mobile-category-service'},
            //  },
            // "/mobile-mainGoods-service": {
            //  target: "http://192.168.42.45:8186",
            //  changeOrigin: true,
            //  },
            // "/mobile-category-service": {
            //  target: "http://192.168.40.58:8084",
            //  changeOrigin: true,
            //  },
            //  "/mobile-goods-service": {
            //  target: "http://192.168.40.27:8086",
            //  changeOrigin: true,
            //  },


        }
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#cheap-module-source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // new PrerenderSpaPlugin(
        //     // (REQUIRED) Absolute path to static root
        //     path.join(__dirname, './vue'),
        //     // (REQUIRED) List of routes to prerender
        //     [ '/recharge', '/seller'],
        //     {
        //         captureAfterTime: 2500,
        //         ignoreJSErrors: true,
        //         postProcessHtml: function (context) {
        //             var returnContext;
        //             var titles = {
        //                 '/recharge': '手游充值-5173游戏交易平台',
        //                 '/seller': '我要卖-5173游戏交易平台'
        //             }
        //             var keyWords = {
        //                 '/recharge': '手游充值,苹果代充,安卓代充,苹果ID快充,首充号续充,苹果首充号,安卓首充号,商铺店家,游戏下载',
        //                 '/seller': '5173,手机站,手机5173,手机游戏,手游交易,手游交易平台,游戏交易,账号交易,游戏币交易,装备交易,游戏代练,账号,买号,卖号,手游交易排行榜,游戏交易排行榜'
        //             }
        //             returnContext= context.html.replace(
        //                 /<title>[^<]*<\/title>/i,
        //                 '<title>' + titles[context.route] + '</title>'
        //             )
        //             returnContext= returnContext.replace(
        //                 /<meta[^<]* name="keywords">/i,
        //                 '<meta  content="' + keyWords[context.route] + '" name="keywords">'
        //             )

        //             return returnContext;
        //         }
        //     }
        // )
    ])
}
