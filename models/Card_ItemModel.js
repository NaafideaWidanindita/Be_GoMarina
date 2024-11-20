import { Sequelize } from "sequelize";
import db from "../database/db.js";
// import RoleModel from "./RoleModel.js";
// import ProductModel from "./ProductModel.js";

const { DataTypes } = Sequelize;

const Card_ItemModel = db.define("card_item",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: { 
      type: DataTypes.BIGINT,
      references: {
        model: "role",
        key: "id",
      },
      allowNull: false,
    },
    product_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "product",
        key: "id",
      },
      allowNull: false,
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, 
  }
);

// Card_ItemModel.belongsTo(RoleModel, { foreignKey: "role_id"});
// Card_ItemModel.belongsTo(ProductModel, { foreignKey: "product_id"});

export default Card_ItemModel;