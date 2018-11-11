const path = require('path');
const fs = require('fs');
const ip = require('ip');
module.exports = app => {
  const exports = {};

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.view = {
    cache: false
  };

  exports.vuessr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html'),
    renderOptions: {
      // 告诉 vue-server-renderer 去 app/view 查找异步 chunk 文件
      basedir: path.join(app.baseDir, 'app/view')
    }
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'access'
  ];
  // cors 跨域配置
  exports.cors = {
    origin: "*",
    allowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH",
    MaxAge: 60*10*1000,
    // credentials: true,
  };

  // exports.jsonp = {
  //   csrf: true,
  // }
  // 配置数据库
  exports.mysql = {
        // clients: {
        //    pc:{
        //        host:'10.235.113.229',
        //        port: '3306',
        //        user: 'root',
        //        password: 'shen128574',
        //        database:'act',
        //    },
        //    mac:{
        //        host:'localhost',
        //        port: '3306',
        //        user: 'root',
        //        password: '0071314as',
        //        database:'act',
        //    }
        // },
        // default:{
        // },
         host:'localhost',
         port: '3306',
         user: 'root',
         password: '0071314as',
         database:'act',
        app: true,
        agent: false,
    };

    const localIP = ip.address();
    const domainWhiteList = [];
    [7003, 7008, 7004].forEach(port => {
        domainWhiteList.push(`http://localhost:${port}`);
        domainWhiteList.push(`http://127.0.0.1:${port}`);
        domainWhiteList.push(`http://${localIP}:${port}`);
    });

    exports.security = { domainWhiteList };

  return exports;
};
