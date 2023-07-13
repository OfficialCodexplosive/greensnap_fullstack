const { DataTypes } = require("sequelize");
const { itemSizeUnits, itemTypes } = require("../../config");

const ItemModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue : itemTypes.ALTGLAS
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sizeUnit: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: itemSizeUnits.CENTIMETER,
  },
  latitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false,
  },
  municipality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("item", ItemModel)
  },

  createItem: (item) => {
    return this.model.create(item);
  },

  findItem: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateItem: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllItems: (query) => {
    return this.model.findAll({
      where: query
    });
  },

  deleteItem: (query) => {
    return this.model.destroy({
      where: query
    });
  }
}