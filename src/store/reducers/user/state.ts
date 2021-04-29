export type UserInfo = {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string
}

export type UserInfoEmpty = UserInfo | undefined

export const info: UserInfo = {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: ''
}

type LoadStatus = 'success' | 'pending' | 'failed'

export type State = {
    status: LoadStatus,
    info?: UserInfo,
    init: boolean
}

export const initialState: State = {
    info: undefined,
    status: 'success',
    init: false
}
