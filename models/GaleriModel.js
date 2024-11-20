import { Sequelize } from "sequelize";
import db from "../database/db.js";

const { DataTypes } = Sequelize;

const GaleriModel = db.define("galeri",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    option: {
      type: DataTypes.ENUM("jambu","kuda","spot foto","lainnya"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true, 
  }
);

export default GaleriModel;