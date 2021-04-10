import {create, getAll} from '../controllers/record.controller'

const recordRoutes = (app: any) => {  
    var router = require("express").Router();
  
    // Create a new record
    router.post("/", create)
  
    // read the list of records
    router.get("/", getAll)
  
    app.use("/api/records", router);
  };

  export default recordRoutes