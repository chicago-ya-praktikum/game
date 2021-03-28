export type AuthReducer = {
    user: Nullable<any>
    authStatus: boolean
}

type Nullable<T> = T | null

export const initialState: AuthReducer = {
    user: null,
    authStatus: false
}
