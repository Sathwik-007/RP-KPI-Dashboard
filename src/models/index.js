import Sequelize from "sequelize";
import dbConfig from "../config/database.js";

// Imorting models
import userModel from "./user.model.js";
import ticketModel from "./ticket.model.js";

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: dbConfig.pool,
  logging: dbConfig.logging,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initializing Models
db.User = userModel(sequelize, Sequelize);
db.Ticket = ticketModel(sequelize, Sequelize);

export default db;