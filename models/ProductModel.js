import { Sequelize } from "sequelize";
import db from "../database/db.js";
// import Card_ItemModel from "./Card_ItemModel.js";

const { DataTypes } = Sequelize;

const ProductModel = db.define("product",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, 
  }
);

// ProductModel.hasMany(Card_ItemModel, { foreignKey: "id" });

export default ProductModel;