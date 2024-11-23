/* Esta clase se encarga de definir las relaciones entre las tablas y sincronizar los modelos con la base de datos*/

const sequelize = require('../../sqlServer_connection');
const Dog = require('./dogs');
const Comment = require('./comments');
const User = require('../users');

// Definir relaciones
Dog.hasMany(Comment, { foreignKey: 'perroRelacionado', as: 'comentarios' });
Comment.belongsTo(Dog, { foreignKey: 'perroRelacionado', as: 'perro' });

User.hasMany(Comment, { foreignKey: 'autorComentario', as: 'comentarios' });
Comment.belongsTo(User, { foreignKey: 'autorComentario', as: 'autor' });

(async () => {
  try {
    await sequelize.sync({ force: false }); // Cambia a `force: true` si quieres recrear las tablas
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar los modelos:', error);
  }
})();

module.exports = {
  Dog,
  Comment,
  User,
};
