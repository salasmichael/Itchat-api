const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/sequelize.config");
class Message extends Model {}
const User = require('./user.model');


Message.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
    timestamp: DataTypes.DATE
},{
    sequelize,
    tableName: 'messages',
    timestamps: false
});

Message.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Message;