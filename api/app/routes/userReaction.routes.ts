import {create, getAll} from '../controllers/userReaction.controller'

const userReactionsRoutes = (app: any) => {  
    var router = require("express").Router()
  
    router.post("/:id/reactions/", create);
  
    router.get("/:id/reactions/", getAll)
  
    app.use("/api/records", router)
  };

  export default userReactionsRoutes