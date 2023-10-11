'use strict';
const {
  Model
} = require('sequelize');

const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class TastingNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TastingNote.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true
       });
    }
  }
  TastingNote.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TastingNote',
  });
  return TastingNote;
};
