const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/sequelize.config");
class User extends Model {}

User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
},{
    sequelize,
    tableName: 'users',
    timestamps: false
});

module.exports = User;