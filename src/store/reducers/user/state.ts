export const info = {
    // id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: ''
}

type LoadStatus = 'success' | 'pending' | 'failed'
export type Info = typeof info

export type State = {
    status: LoadStatus,
    authStatus: boolean,
    info: Info | null,
    id: number
}

export const initialState: State = {
    info: null,
    status: 'failed',
    authStatus: false,
    id: 0
}
