export const userDataRules = {
    headers: {
        authorization: 'required'
    },
    body: {
        displayName: 'required',
        avatar: 'string'
    }
}

export const recordDataRules = {
    headers: {
        authorization: 'required'
    },
    body: {
        title: 'required',
        content: 'required'
    }
}

export const userReactionDataRules = {
    headers: {
        authorization: 'required'
    },
    body: {
        reactionId: 'required'
    }
}

export const commentDataRules = {
    headers: {
        authorization: 'required'
    },
    body: {
        recordId: 'required',
        content: 'required'
    }
}
