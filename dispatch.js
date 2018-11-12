const egg = require('egg');
const os = require('os');
process.env.VUE_ENV = "server";
// process.env.NODE_ENV = "production";
// process.env.EGG_PORT
console.log("___________________________");
console.log(process.env.NODE_ENV)
console.log(process.env.EGG_SERVER_ENV)

console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
const workers = Number( process.argv[2] || os.cpus().length );
egg.startCluster({
    workers,
    port: process.env.PORT || "7003",
    host: "localhost",
    baseDir: __dirname,
    // framework: 'egg',

})