import { Sequelize } from "sequelize";

const db = new Sequelize("be_gomarina", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
