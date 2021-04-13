import {create, getAll, getOne} from '../controllers/user.controller'

const userRoutes = (app: any) => {  
    var router = require("express").Router()
  
    router.post("/", create);
  
    router.get("/", getAll)

    router.get("/:id", getOne)
  
    app.use("/api/users", router)
  };

  export default userRoutes