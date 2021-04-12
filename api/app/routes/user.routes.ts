import {create, getAll, getOne} from '../controllers/user.controller'

const userRoutes = (app: any) => {  
    var router = require("express").Router()
  
    // Create a new forum user
    router.post("/", create);
  
    // read the list of forum users
    router.get("/", getAll)

    router.get("/:id", getOne)
  
    app.use("/api/users", router)
  };

  export default userRoutes