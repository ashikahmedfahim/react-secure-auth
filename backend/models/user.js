const { sequelize } = require("../configs/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        }
    },
    {
        tableName: "users",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        scopes: {
            login: {
                attributes: ['id', 'username', 'status']
            }
        }
    },

);

module.exports = User;