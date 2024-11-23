/**
 * Modelo de datos para la tabla `Comments`.
 * 
 * @typedef {Object} Comment
 * @property {string} textoComentario - Texto del comentario.
 * @property {Date} fechaComentario - Fecha del comentario.
 * @property {number} autorComentario - ID del autor del comentario.
 * @property {number} perroRelacionado - ID del perro relacionado con el comentario.
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../../sqlServer_connection');
const User = require('../users');
const Dog = require('../dogs');

/**
 * Define el modelo `Comment` para la tabla `Comments`.
 */
const Comment = sequelize.define('Comment', {
  textoComentario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaComentario: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Comments', // Nombre de la tabla en SQL Server
  timestamps: true, // Crea columnas `createdAt` y `updatedAt` automáticamente
});

// Relación con el modelo `User`
Comment.belongsTo(User, { foreignKey: 'autorComentario', as: 'autor' });
// Relación con el modelo `Dog`
Comment.belongsTo(Dog, { foreignKey: 'perroRelacionado', as: 'perro' });

module.exports = Comment;