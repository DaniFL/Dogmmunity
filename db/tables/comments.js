const { DataTypes } = require('sequelize');
const sequelize = require('../sqlServer_connection');
const User = require('./users');
const Dog = require('./dogs');

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
  tableName: 'Comments',
  timestamps: true,
});

// Relación con el modelo `User`
Comment.belongsTo(User, { foreignKey: 'autorComentario', as: 'autor' });
// Relación con el modelo `Dog`
Comment.belongsTo(Dog, { foreignKey: 'perroRelacionado', as: 'perro' });

module.exports = Comment;
