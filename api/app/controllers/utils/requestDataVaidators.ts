export const userDataRules = {
    body: {
        displayName: 'required',
        avatar: 'required'
    }
}

export const recordDataRules = {
    body: {
        title: 'required',
        content: 'required'
    }
}

export const userReactionDataRules = {
    body: {
        reactionId: 'required'
    }
}

export const commentDataRules = {
    body: {
        recordId: 'required',
        content: 'required'
    }
}
