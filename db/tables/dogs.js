/**
 * Modelo de datos para la tabla `Dogs`.
 * 
 * @typedef {Object} Dog
 * @property {string} nombrePerro - Nombre del perro.
 * @property {Date} edadPerro - Fecha de nacimiento del perro.
 * @property {number} pesoPerro - Peso del perro en kilogramos.
 * @property {string} sexo - Sexo del perro.
 * @property {string} raza - Raza del perro.
 * @property {string} [dueno] - Nombre del dueño del perro (opcional).
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../sqlServer_connection');

/**
 * Define el modelo `Dog` para la tabla `Dogs`.
 */
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
