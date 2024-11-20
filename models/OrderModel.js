// Import Sequelize dan db instance
import { Sequelize } from "sequelize";
import db from "../database/db.js";

// Import model-model terkait
// import RoleModel from "./RoleModel.js";
// import AddressModel from "./AddressModel.js";
// import Order_ItemModel from "./Order_ItemModel.js";

const { DataTypes } = Sequelize;

// Mendefinisikan OrderModel
const OrderModel = db.define("order", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  address_id: {
    type: DataTypes.BIGINT,
    references: {
      model: "address",
      key: "id",
    },
    allowNull: false,
  },
  role_id: {
    type: DataTypes.BIGINT,
    references: {
      model: "role",
      key: "id",
    },
    allowNull: false,
  },
  total: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  freezeTableName: true,
});

// Pastikan Anda mendefinisikan relasi setelah semua model didefinisikan
// OrderModel.belongsTo(RoleModel, { foreignKey: "role_id" });

// AddressModel.hasMany(OrderModel, { foreignKey: "address_id" });
// OrderModel.belongsTo(AddressModel, { foreignKey: "address_id" });

// OrderModel.hasMany(Order_ItemModel, { foreignKey: "order_id" });

// Ekspor model
export default OrderModel;
