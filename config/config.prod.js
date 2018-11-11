/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */
const os = require('os')

module.exports = app => {
  const exports = {
    cluster:{
      listen: {
        port: "7003",
        // hostname: "127.0.0.1",
        // worker: os.cpus().length,
        // baseDir: process.cwd(),
        // framework: "egg",
      }
    }
    //   mysql: {
    //     client: {
    //       host:'localhost',
    //       port: '3306',
    //       user: 'root',
    //       password: '0071314as',
    //       database:'act',
    //     },
    //       app: true,
    //       agent: false,
    //   }
  }

  return exports
};
