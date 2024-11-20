import { Sequelize } from "sequelize";
import db from "../database/db.js";

const { DataTypes } = Sequelize;

const AgendaModel = db.define("agenda",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, 
  }
);

export default AgendaModel;