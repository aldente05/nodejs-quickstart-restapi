/**
 * Created by f.putra on 06/12/18.
 */
let Sequelize = require('sequelize');
let sequelize = new Sequelize(JSON.parse(process.env.CONFIG));

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}, (err) => {
    console.log('Unable to connect to the database:', err);
});

sequelize.sync({force: false})
    .then(() => {
        console.log('It worked!');
    }, (err) => {
        console.log('An error occurred while creating the table:', err);
    });
module.exports = sequelize;
