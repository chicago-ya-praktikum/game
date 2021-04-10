import {db} from '../models/index'
const User = db.users;
// const Op = db.Sequelize.Op;

// Create and Save a new forum-user
export const create = (req: { body: { userId: any; displayName: any; avatar: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; send: (arg0: any) => void; }) => {
  // Validate request
  if (!req.body
    || !req.body.userId
    || !req.body.displayName
    || !req.body.avatar
    ) {
    res.status(400).send({
      message: "Wrong API"
    });
    return;
  }

  // Create a forum-user
  const user = {
    userId: req.body.userId,
    displayName: req.body.displayName,
    avatar: req.body.avatar
  };

  // Save forum user in the database
  User.create(user)
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the forum user."
      });
    });
};

// Get all forum-users from the database.
export const getAll = (req: any, res: any) => {
    console.log(req)
//   const title = req.query.title;
//   to do condition - user is online
//   var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  User.findAll()
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};