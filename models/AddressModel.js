import { Sequelize } from "sequelize";
import db from "../database/db.js";
// import RoleModel from "./RoleModel.js";
// import OrderModel from "./OrderModel.js";

const { DataTypes } = Sequelize;

const AddressModel = db.define("address",
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
    provinsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true, 
  }
);

// AddressModel.belongsTo(RoleModel, { foreignKey: "role_id" });
// AddressModel.belongsTo(RoleModel, { foreignKey: "address_id" });

export default AddressModel;