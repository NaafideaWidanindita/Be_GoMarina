import { Sequelize } from "sequelize";
import db from "../database/db.js";
// import OrderModel from "./OrderModel.js";

const { DataTypes } = Sequelize;

const DeliveryModel = db.define("delivery",
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
    option: {
      type: DataTypes.ENUM("jnt","jne","langsung"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("packing","deliver","arrived"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true, 
  }
);

// DeliveryModel.belongsTo(OrderModel, { foreignKey: "order_id" });

export default DeliveryModel;