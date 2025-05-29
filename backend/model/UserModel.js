// export default { Notes, User };

import { Sequelize } from "sequelize";
import db from "../config/database.js";

export const Notes = db.define("notes", {
    title: Sequelize.STRING,
    category: Sequelize.STRING,
    note: Sequelize.STRING,
});

export const User = db.define("user", {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    refresh_token: Sequelize.TEXT,
});

db.sync().then(() => console.log("database synced"));
