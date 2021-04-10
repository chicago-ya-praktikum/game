import {db} from '../models/index'
const Record = db.records;
// const Op = db.Sequelize.Op;

// Create and Save a new record
export const create = (req: any, res: any) => {
  // Validate request
  if (!req.body
    || !req.body.userId
    || !req.body.content
    ) {
    res.status(400).send({
      message: "Wrong API"
    });
    return;
  }

  // Create a record
  const record = {
    parentId: req.body.parentId,
    userId: req.body.userId,
    content: req.body.content
  };

  // Save forum user in the database
  Record.create(record)
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the record."
      });
    });
};

// Get all forum-users from the database.
// export const getAll = (req: any, res: any) => {
//     console.log(req)
// //   const title = req.query.title;
// //   to do condition - user is online
// //   var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

//   User.findAll()
//     .then((data: any) => {
//       res.status(200).send(data);
//     })
//     .catch((err: { message: any; }) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
