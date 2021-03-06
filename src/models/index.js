const Sequelize = require('sequelize');
const connection = require('../libs/databaseConfig');

const sequelize = new Sequelize(
    connection.database,
    connection.user,
    connection.password,
    {
        host: connection.host,
        dialect: connection.dialect,
        operatorsAliases: 0,
        pool: {
            max: connection.pool.max,
            min: connection.pool.min,
            acquire: connection.pool.acquire,
            idle: connection.pool.idle,
        },
    },
);
db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Imports
db.user = require('../models/user.models')(sequelize, Sequelize);
db.role = require('../models/role.models.js')(sequelize, Sequelize);

//Associations
db.role.hasMany(db.user, { foreignKey: 'Role_ID' });
db.user.belongsTo(db.role, { foreignKey: 'Role_ID' });

module.exports = db;