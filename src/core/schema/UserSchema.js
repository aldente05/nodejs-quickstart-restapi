/**
 * Created by f.putra on 2019-07-30.
 */
let sequelize = require('../RepositoryConfig');
const Sequelize = require('sequelize');

const User = sequelize.define('system_user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name : {
        type : Sequelize.STRING
    },
    email :{
        type : Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    hash: {
        type: Sequelize.STRING
    },
    role : {
        type : Sequelize.STRING
    },
    location : {
        type : Sequelize.STRING
    }
},{
    indexes: [
        {
            unique: true,
            name: 'unique_email',
            fields: [sequelize.fn('lower', sequelize.col('email'))]
        }
    ]
})
module.exports = User;
