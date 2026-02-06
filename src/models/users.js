const {DataTypes} = require('sequelize');
const { sequelize} = require('../config/db')

const Users = sequelize.define('Users',{
    id:{ type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{ type:DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: { type: DataTypes.BOOLEAN, 
        defaultValue: false 
    }
})
module.exports = Users;