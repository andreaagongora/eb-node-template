const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Tarea = sequelize.define(
  "Tarea",
  {
    titulo: { type: DataTypes.STRING, allowNull: false },
    completada: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { tableName: "tareas", timestamps: true }
);

module.exports = Tarea;
