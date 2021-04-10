const express = require("express");
export const app = express();
import {db} from './models/index'

db.sequelize.sync().then(() => {
}) 

app.get("/", (req: any, res: any) => {
    console.log(req)
  res.json({ message: "Welcome to sokoban api", db: db });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
