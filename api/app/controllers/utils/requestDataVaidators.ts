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


export const isRecordData = (obj: any) => {
    if (!obj.body
        || !obj.body.title
        || typeof obj.body.title !== 'string'
        || !obj.body.content
        || typeof obj.body.content !== 'string'
        || !obj.headers.authorization
        || typeof obj.headers.authorization !== 'string') {
        return false
    }
    return true
}

export const isUserReactionData = (obj: any) => {
    if (!obj.body
       || !obj.body.reactionId
       || typeof obj.body.reactionId !== 'number') {
        return false
       }
       return true
}