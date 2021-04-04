import {URL_AUTH, URL_USER, API_ROOT} from './contstants/index'

type SignUpObj = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

type UserPutData = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

type SignInObj = Partial<SignUpObj>

type ChangePasswordObj = {
    oldPassword: string,
    newPassword: string
}

type RequestObject = SignInObj | SignUpObj | ChangePasswordObj | FormData | File

const requestHeaders = {
    'Content-Type': 'application/json'
}

const requestCredentials = 'include'

const responseBody = (res: {json: () => any}) => res.json()
const onResponse = (response: Response) => response

const requests = {
    del: (path: string) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'DELETE',
                headers: requestHeaders,
                credentials: requestCredentials
            })
            .then(responseBody)
    },
    get: (path: string) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'GET',
                headers: requestHeaders,
                credentials: requestCredentials
            })
            .then(onResponse)
    },
    patch: (path: string, body?: RequestObject) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'PATCH',
                headers: requestHeaders,
                credentials: requestCredentials,
                body: JSON.stringify(body)
            })
            .then(responseBody)
    },
    post: (path: string, body?: RequestObject) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'POST',
                headers: requestHeaders,
                credentials: requestCredentials,
                body: JSON.stringify(body)
            })
            .then(response => response)
    },
    put: (path: string, body?: RequestObject) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'PUT',
                headers: requestHeaders,
                credentials: requestCredentials,
                body: JSON.stringify(body)
            })
            .then(onResponse)
    },
    putFormData: (path: string, body?: RequestObject) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'PUT',
                credentials: requestCredentials,
                body: <FormData>body
            })
            .then(onResponse)
    }
};

export const Auth = {
    signIn: (obj: SignInObj, path = URL_AUTH.SIGNIN) => requests.post(path, obj),
    logout: (path = URL_AUTH.LOGOUT) => requests.post(path),
    signUp: (obj: SignUpObj, path = URL_AUTH.SIGNUP) => requests.post(path, obj),
    user: (path = URL_USER.GET_USER_INFO) => requests.get(path)
};

export const Users = {
    putPassword: (
        obj: ChangePasswordObj,
        path = URL_USER.PUT_PASSWORD
    ) => requests.put(path, obj),
    putAvatar: (obj: FormData, path = URL_USER.PUT_AVATAR) => requests.putFormData(path, obj),
    putProfile: (obj: UserPutData, path = URL_USER.PUT_PROFILE) => requests.put(path, obj)
}
