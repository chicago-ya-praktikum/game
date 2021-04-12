import { getAll} from '../controllers/reaction.controller'

const reactionRoutes = (app: any) => {
  var router = require("express").Router();

  router.get("/", getAll)

  app.use("/api/reaction", router);
};

export default reactionRoutes