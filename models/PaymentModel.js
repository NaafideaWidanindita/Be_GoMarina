import { Sequelize } from "sequelize";
import db from "../database/db.js";
// import OrderModel from "./OrderModel.js";

const { DataTypes } = Sequelize;

const PaymentModel = db.define("payment",
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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option: {
      type: DataTypes.ENUM("qris","mandiri"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending","approved","invalid"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true, 
  }
);

// PaymentModel.belongsTo(OrderModel, { foreignKey: "order_id" });

export default PaymentModel;