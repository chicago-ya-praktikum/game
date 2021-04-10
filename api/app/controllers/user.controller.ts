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

  // Save Tutorial in the database
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

// // Retrieve all Tutorials from the database.
export const getAll = (req: any, res: any) => {
    console.log(req)
//   const title = req.query.title;
//   condition - user is online
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

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Tutorial with id=" + id
//       });
//     });
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;

//   Tutorial.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Tutorial was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id
//       });
//     });
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Tutorial.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Tutorial was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Tutorial with id=" + id
//       });
//     });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Tutorials were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     });
// };

// // find all published Tutorial
// exports.findAllPublished = (req, res) => {
//   Tutorial.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };