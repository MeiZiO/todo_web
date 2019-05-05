// const lunbo = require("./mock/lunbotu.json")//引入mock数据
// const tag = require("./mock/tag.json")

module.exports = {
    // 基本路径
    baseUrl: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,

    //静态资源目录（js,css,img,fonts）
    assetsDir:"assets",
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
     // 是否使用css分离插件 ExtractTextPlugin
     extract: true,
     // 开启 CSS source maps?
     sourceMap: false,
     // css预设器配置项
     loaderOptions: {
        less: {
            javascriptEnabled: true
          }    
     },
     // 启用 CSS modules for all css / pre-processor files.
     modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // webpack-dev-server 相关配置
    devServer: {
        open: true, //是否自动打开页面
        //host: '192.168.1.105',//如果真机测试需要设置电脑本地路由的V4ip，本地用localhost 192.168.68.135
        port: 8088,//本地服务器端口
        https: false,//是否用https
        hotOnly: false,//是否开启热更新    
        proxy:  {
            //配置跨域
            'api':{
                target: "172.20.10.2:3000", //后台
                // target: "10.168.0.107:3000", //后台
                // target: "10.168.1.235:3000", //后台
                // target: "10.20.50.46:3000", //后台
                // target: "10.168.1.234:8088", //http:192.168.1.105:8088
                // target: "192.168.0.107:8088", //http:192.168.1.105:8088
                ws: true,//是否开启跨域
                changOrigin: true,
                pathRewrite: {
                    '^/api':''
                }
            }//下面可以设置更多代理
        },
        before(app){//请求数据这样写就可以了moke
            //http://localhost:8081/api/goods
            // app.get("/api/goods",(req,res)=>{
            //     res.json(lunbo);
            // });

            // app.get("/api/tags",(req,res)=>{
            //     res.json(tag);
            // })
        },
    },
    // 第三方插件配置
    pluginOptions: {
     // ...
    }
} 