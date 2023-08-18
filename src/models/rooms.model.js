const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/sequelize.config");
class Room extends Model {}

Room.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    room_name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
},{
    sequelize,
    tableName: 'rooms',
    timestamps: false
});

module.exports = Room;