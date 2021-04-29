// @ts-ignore
export const errorMiddleware = (err: Error, req, res) => {
    res.status(400).send(err.message)
}
