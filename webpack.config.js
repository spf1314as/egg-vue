'use strict';
module.exports = {
  egg: true, // webpack 将文件打包到 app/view 当中
  framework: 'vue',
  entry: {
    app: 'app/web/page/app/index.js'
  },
    // buildPath:{
    //
    // },
    // publicPath:{
    //
    // },

  alias: {
    component: 'app/web/component',
    framework: 'app/web/framework',
    store: 'app/web/store',
    vue: 'vue/dist/vue.esm.js',
  },
  dll: ['vue', 'axios', 'vue-router', 'vuex', 'vuex-router-sync'],
  loaders: {
      sass: true, // 默认没有开启
      scss: true,// 默认开启
      eslint: {
        options: {fix: true}
      }
  },
  plugins: {
    copy: [{
      from: 'app/web/asset/css/bootstrap.min.css',
      to: 'asset/css/bootstrap.min.css'
    }],
      uglifyJs:{
          cache: true,
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
              compress: {
                  // 删除掉console
                  drop_console: true,
              },
              output: {
                  comments: false
              }
          }
      }
  },
   create(){

   },
  done() {
      console.log(process.env)
      console.log("build finish")
  }
};