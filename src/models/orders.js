const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); 

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
    
}, {
    tableName: 'orders',
    underscored: true 
});

Order.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Order;