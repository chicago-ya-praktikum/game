export const actionCreator = (actionType: string, actionPayload?: any) => ({
    type: actionType,
    payload: actionPayload || null
})
