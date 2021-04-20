export const getUnknownError = (err: string) => JSON.parse(`{
    "status": 520,
    "statusText": "Unknown Error",
    "data": {"message": "${err}"}
}`)
