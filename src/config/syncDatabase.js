import sequelize from "./database.js";
import "../models/index.js";

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connection successful!");

    await sequelize.sync();

    console.log("Database tables synchronized successfully!");
  } catch (error) {
    console.error("Database synchronization failed:", error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

syncDatabase();