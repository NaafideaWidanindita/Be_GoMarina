import { Sequelize } from "sequelize";
import db from "../database/db.js";
import AddressModel from "./AddressModel.js";
import OrderModel from "./OrderModel.js";
import Card_ItemModel from "./Card_ItemModel.js";

const { DataTypes } = Sequelize;

const RoleModel = db.define("role",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, 
  }
);

RoleModel.hasMany(AddressModel, { foreignKey: "role_id" });
RoleModel.hasMany(OrderModel, { foreignKey: "role_id" });
RoleModel.hasMany(Card_ItemModel, { foreignKey: "role_id" });

export default RoleModel;