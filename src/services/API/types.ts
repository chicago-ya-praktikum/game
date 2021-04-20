export type YaCookie = {
    authCookie: string
    uuid: string
}

export type YaCookieNull = YaCookie | null

export type ErrorResponse = {
    data: {message: string}
    status: number
    statusText: string
}
