export const isUserData = (obj: any) => {
    if (!obj.body
        || !obj.body.displayName
        || typeof obj.body.displayName !== 'string'
        || !obj.body.avatar
        || typeof obj.body.avatar !== 'string'
        || !obj.headers.authorization
        || typeof obj.headers.authorization !== 'string') {
        return false
    }
    return true
}