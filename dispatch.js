const egg = require('egg');
const os = require('os');
process.env.VUE_ENV = "server";
const workers = Number( process.argv[2] || os.cpus().length );
console.log(process.env.PORT)
egg.startCluster({
    workers,
    port: process.env.PORT || "7003",
    host: "localhost",
    baseDir: __dirname,
    // framework: 'egg',

})