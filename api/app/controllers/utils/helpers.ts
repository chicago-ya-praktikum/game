import {db} from '../../models/index'

const Token = db.tokens

export const checkUserStatus = async (token: any) => {
    const status = Token.findOne({where: {token}})
        .then((data: any) => (data !== null ? data.id : false))
        .catch((err: {message: any;}) => {
            console.log(err)
        });
    return await status
}
