import {create} from '../controllers/record.controller'

const recordRoutes = (app: any) => {  
    var router = require("express").Router();
  
    // Create a new forum user
    router.post("/", create);
  
    // read the list of forum users
    // router.get("/", getAll);
  
    app.use("/api/records", router);
  };

  export default recordRoutes