const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Products = sequelize.define('Products', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: { 
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: { 
        type: DataTypes.INTEGER,
        defaultValue: 0 
    }
});
module.exports = Products;