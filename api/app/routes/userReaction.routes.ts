import {create} from '../controllers/userReaction.controller'

const userReactionsRoutes = (app: any) => {  
    var router = require("express").Router()
  
    router.post("/", create);
  
    // router.get("/", getAll)

    // router.get("/:id", getOne)
  
    app.use("/api/userreactions", router)
  };

  export default userReactionsRoutes