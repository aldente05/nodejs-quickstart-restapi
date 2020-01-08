const {Op} = require('sequelize');
module.exports = {
    apps: [{
        name: 'Quickstart Service',
        script: 'app.js',
        instances : 1,
        exec_mode : "fork",
        watch: true,
        error_file: "./logs/err.log",
        out_file: "./logs/out.log",
        merge_logs: true,
        log_date_format: "YYYY-MM-DD HH:mm Z",
        ignore_watch: [".idea", "node_modules", ".git", "uploads", "logs", "data", "export"],
        env_development: {
            LISTEN_PORT : 3200,
            NODE_ENV: 'development',
            STORAGE: './uploads',
            SESSION: JSON.stringify({
                name: 'session',
                keys: ['key1', 'key2'],
                cookie: {
                    secure: true,
                    httpOnly: true,
                    domain: 'example.com',
                    path: 'foo/bar',
                    expires: new Date(Date.now() + 60 * 60 * 1000)
                }
            }),
            ELASTICSEARCH: JSON.stringify({
                hosts: ["http://192.168.99.100:32776"]
            }),
            CONFIG: JSON.stringify({
                username: 'root',
                password: 'root',
                database: 'root',
                host: '127.0.0.1',
                port: '32768',
                dialect: 'postgres',
                pool: {
                    max: 20,
                    min: 0,
                    acquire: 30000,
                    idle: 1000
                },
                logging: false,
                operatorsAliases: {
                    $and: Op.and,
                    $or: Op.or,
                    $eq: Op.eq,
                    $gt: Op.gt,
                    $lt: Op.lt,
                    $lte: Op.lte,
                    $like: Op.like
                }
            }),
        },
        env_staging: {
            NODE_ENV: 'staging',
            STORAGE: './uploads',
            SESSION: JSON.stringify({
                name: 'session',
                keys: ['key1', 'key2'],
                cookie: {
                    secure: true,
                    httpOnly: true,
                    domain: 'example.com',
                    path: 'foo/bar',
                    expires: new Date(Date.now() + 60 * 60 * 1000)
                }
            }),
            ELASTICSEARCH: JSON.stringify({
                hosts: ["http://192.168.99.100:32772"]
            }),
            CONFIG: JSON.stringify({
                username: 'payroll',
                password: 'root',
                database: 'payroll',
                host: '192.168.99.100',
                port: '32772',
                dialect: 'postgres',
                pool: {
                    max: 20,
                    min: 0,
                    acquire: 30000,
                    idle: 1000
                },
                operatorsAliases: {
                    $and: Op.and,
                    $or: Op.or,
                    $eq: Op.eq,
                    $gt: Op.gt,
                    $lt: Op.lt,
                    $lte: Op.lte,
                    $like: Op.like
                }
            }),
        },
        env_production: {
            LISTEN_PORT : 3400,
            NODE_ENV: 'production',
            STORAGE: './uploads',
            SESSION: JSON.stringify({
                name: 'session',
                keys: ['key1', 'key2'],
                cookie: {
                    secure: true,
                    httpOnly: true,
                    domain: 'example.com',
                    path: 'foo/bar',
                    expires: new Date(Date.now() + 60 * 60 * 1000)
                }
            }),
            CONFIG: JSON.stringify({
                username: 'inteldakim',
                password: 'bFz6IqLAm239e1cnBc8C100',
                database: 'inteldakim',
                host: 'postgresql_inteldakim',
                port: 7654,
                dialect: 'postgres',
                pool: {
                    max: 20,
                    min: 0,
                    acquire: 30000,
                    idle: 1000
                },
                operatorsAliases: {
                    $and: Op.and,
                    $or: Op.or,
                    $eq: Op.eq,
                    $gt: Op.gt,
                    $lt: Op.lt,
                    $lte: Op.lte,
                    $like: Op.like
                }
            })
        }
    }]
};
