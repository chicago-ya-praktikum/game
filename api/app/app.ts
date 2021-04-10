const express = require("express");
export const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
import { db } from './models/index'


var corsOptions = {
    origin: "https://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
})

app.get("/", (req: any, res: any) => {
    console.log(req)
    res.json({ message: "Welcome to sokoban api"});
});

// require("./app/routes/user.routes")(app);
import userRout from './routes/user.routes'

userRout(app)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
