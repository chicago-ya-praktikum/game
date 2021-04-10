const express = require("express");
export const app = express();
import {db} from './models/index'

db.sequelize.sync();

app.get("/", (req: any, res: { json: (arg0: { message: string; }) => void; }) => {
    console.log(req)
  res.json({ message: "Welcome to sokoban api" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
