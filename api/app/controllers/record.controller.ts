import { db } from '../models/index'
import { checkUserStatus } from './helpers'
const Record = db.records;

export const create = (req: any, res: any) => {
  if (!req.body
    || !req.body.content
    || !req.headers.authorization
  ) {
    res.status(400).send({
      message: "Wrong API"
    });
    return;
  }

  checkUserStatus(req.headers.authorization)
    .then(data => {
      if (!data) {
        res.status(401).send('Unauthorized')
      } else {
        const record = {
          userId: data,
          parentId: req.body.parentId,
          content: req.body.content
        };

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

    })
  }


  export const getAll = (req: any, res: any) => {
    checkUserStatus(req.headers.authorization)
      .then(data => {
        if (!data) {
          res.status(401).send('Unauthorized')
        } else {
          Record.findAll()
            .then((data: any) => {
              res.status(200).send(data);
            })
            .catch((err: { message: any; }) => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
        }
      })
  };

  export const remove = (req: any, res: any) => {
    checkUserStatus(req.headers.authorization)
      .then(data => {
        if (!data) {
          res.status(401).send('Unauthorized')
        } else {
    const id = req.params.id;  
    Record.destroy({
      where: { id: id }
    })
      .then((num: number) => {
        if (num == 1) {
          res.send({
            message: "Record was deleted successfully!"
          });
        } else {
          res.status(404).send({
            message: `Cannot delete Record with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch((err: any) => {
        console.log(err)
        res.status(500).send({
          message: `Could not delete Record with id= + ${id}`
        });
      });
        }
      })

  };
