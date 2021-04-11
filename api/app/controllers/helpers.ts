import { db } from '../models/index'
const Token = db.tokens

export const checkUserStatus = async (token: any) => {
    const status = await Token.findOne({ where: { token: token } })
        .then((data: any) => {
            return data !== null ? data.id : false
        })
        .catch((err: { message: any; }) => {
            console.log(err)
        });
    return status
}
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
