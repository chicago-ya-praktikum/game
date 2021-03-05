const API_ROOT = new URL('https://ya-praktikum.tech')

const URL_AUTH = {
    SIGNIN: '/api/v2/auth/signin',
    SIGNUP: '/api/v2/auth/signup',
    LOGOUT: '/api/v2/auth/logout',
    USER_INFO: '/api/v2/auth/user'
}

const URL_USERS = {
    PUT_PASSWORD: '/api/v2/user/password',
    PUT_AVATAR: '/api/v2/user/profile/avatar',
    PUT_PROFILE: '/api/v2/user/profile'
}

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
const onResponse = async (response: Response) => response

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
            .catch((error) => {throw new Error(error)})
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
            .catch((error) => {throw new Error(error)})
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
            .catch((error) => {throw new Error(error)})
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
            .catch((error) => {throw new Error(error)})
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
            .catch((error) => {throw new Error(error)})
    },
    putFormData: (path: string, body?: RequestObject) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'PUT',
                // headers: requestHeaders,
                credentials: requestCredentials,
                body: <FormData>body
            })
            .then(onResponse)
            .catch((error) => {throw new Error(error)})
    }
};

export const Auth = {
    signIn: (obj: SignInObj, path = URL_AUTH.SIGNIN) => requests.post(path, obj),
    logout: (path = URL_AUTH.LOGOUT) => requests.post(path),
    signUp: (obj: SignUpObj, path = URL_AUTH.SIGNUP) => requests.post(path, obj),
    user: (path = URL_AUTH.USER_INFO) => requests.get(path)
};

export const Users = {
    putPassword: (
        obj: ChangePasswordObj,
        path = URL_USERS.PUT_PASSWORD
    ) => requests.put(path, obj),
    putAvatar: (obj: FormData, path = URL_USERS.PUT_AVATAR) => requests.putFormData(path, obj),
    putProfile: (obj: UserPutData, path = URL_USERS.PUT_PROFILE) => requests.put(path, obj)
}
