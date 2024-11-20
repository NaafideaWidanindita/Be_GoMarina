import { Sequelize } from "sequelize";
import db from "../database/db.js";
// import OrderModel from './OrderModel.js';
// import Card_ItemModel from "./Card_ItemModel.js";

const { DataTypes } = Sequelize;

const Order_ItemModel = db.define("order_item",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: { 
      type: DataTypes.BIGINT,
      references: {
        model: "order",
        key: "id",
      },
      allowNull: false,
    },
    card_item_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "card_item",
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
    jumlah_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, 
  }
);

// Order_ItemModel.belongsTo(OrderModel, { foreignKey: "order_id" });
// Order_ItemModel.belongsTo(Card_ItemModel, { foreignKey: "card_item_id" });

export default Order_ItemModel;