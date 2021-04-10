export const checkUserStatus = async (token: any) => {
    const status = await Token.findOne({ where: { token: token } })
        .then((data: any) => {
            console.log(data)
            return data !== null
        })
        .catch((err: { message: any; }) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while looking for token."
            });
        });
    console.log(status)
    return status
}