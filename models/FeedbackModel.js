import { Sequelize } from "sequelize";
import db from "../database/db.js";
// import RoleModel from "./RoleModel.js";

const { DataTypes } = Sequelize;

const FeedbackModel = db.define("feedback",
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
    star: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kritiksaran: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, 
  }
);

// FeedbackModel.belongsTo(RoleModel, { foreignKey: "role_id" });

export default FeedbackModel;