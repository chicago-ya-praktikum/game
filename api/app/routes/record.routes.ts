import { create, getAll, getOne, remove} from '../controllers/record.controller'

const recordRoutes = (app: any) => {
  var router = require("express").Router();

  router.post("/", create)

  router.get("/", getAll)

  router.get("/:id", getOne)

  router.delete("/:id", remove)

  app.use("/api/records", router)
};

export default recordRoutes