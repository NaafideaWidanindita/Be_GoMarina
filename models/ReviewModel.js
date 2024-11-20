import { Sequelize } from "sequelize";
import db from "../database/db.js";
// import RoleModel from "./RoleModel.js";
// import ProductModel from "./ProductModel.js";
// import OrderModel from "./OrderModel.js";

const { DataTypes } = Sequelize;

const ReviewModel = db.define("review",
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
    order_id: { 
      type: DataTypes.BIGINT,
      references: {
        model: "order",
        key: "id",
      },
      allowNull: false,
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, 
  }
);

// ReviewModel.belongsTo(RoleModel, { foreignKey: "role_id" });
// ReviewModel.belongsTo(ProductModel, { foreignKey: "product_id" });
// ReviewModel.belongsTo(OrderModel, { foreignKey: "order_id" });

export default ReviewModel;