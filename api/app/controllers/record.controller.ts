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
