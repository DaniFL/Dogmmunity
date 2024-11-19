const { DataTypes } = require('sequelize');
const sequelize = require('../sqlServer_connection');

const Dog = sequelize.define('Dog', {
  nombrePerro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edadPerro: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pesoPerro: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  raza: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueno: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Dogs', // Nombre de la tabla en SQL Server
  timestamps: true, // Crea columnas `createdAt` y `updatedAt` automáticamente
});

module.exports = Dog;
