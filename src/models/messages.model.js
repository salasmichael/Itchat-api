const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/sequelize.config");
class Message extends Model {}

Message.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
},{
    sequelize,
    tableName: 'messages',
    timestamps: true
});

module.exports = Message;