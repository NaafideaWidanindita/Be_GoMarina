import { Sequelize } from "sequelize";
import db from "../database/db.js";

const { DataTypes } = Sequelize;

const KontenModel = db.define("konten",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_garden: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_add: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    misi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, 
  }
);

export default KontenModel;