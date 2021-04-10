import {create, getAll} from '../controllers/user.controller'

const userRout = (app: any) => {  
    var router = require("express").Router();
  
    // Create a new forum user
    router.post("/", create);
  
    // read the list of forum users
    router.get("/", getAll);
  
    app.use("/api/users", router);
  };

  export default userRout