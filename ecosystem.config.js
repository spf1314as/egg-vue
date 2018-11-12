module.exports = {
    apps : [{
        name      : 'egg-vue',
        script    : 'dispatch',
        "cwd":"./",
        "args":"",
        "watch": ["app","config"],
        "ignore_watch": [
            "node_modules",
            "logs",
            "package.json",
            ".idea"
        ],
        "watch_options":{
            "followSymlinks": false
        },
        "error_file":"./logs/app_err.log",
        "out_file":"./logs/app_out.log",
        "merge_logs": true,
        "log_date_format": "YYYY-MM-DD HH-mm-ss",
        "autorestart": true,
        "env":{   // egg 的端口号只能通过 startcluster 传进去
            "NODE_ENV": "production",
        },
        "env_stage":{
            "NODE_ENV":"local",
        }
    }],

    deploy : {
        production : {
            user : 'node',
            host : 'localhost',
            ref  : 'origin/master',
            repo : 'git@github.com:repo.git',
            path : '/',
            'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
};
