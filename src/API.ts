const API_ROOT = new URL('https://ya-praktikum.tech')

const URLS = {
    SIGNIN: '/api/v2/auth/signin',
    SIGNUP: '/api/v2/auth/signup',
    LOGOUT: '/api/v2/auth/logout',
    USER_INFO: '/api/v2/auth/user'
}

type SignUpObj = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

type SignInObj = Partial<SignUpObj>

const responseBody = (res: { body: any; }) => res.body;

const requests = {
    del: (path: string) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then(responseBody)
            .catch((error) => { throw new Error(error) })
    },
    get: (path: string) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then(responseBody)
            .catch((error) => { throw new Error(error) })
    },
    patch: (path: string, body: any) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body
            })
            .then(responseBody)
            .catch((error) => { throw new Error(error) })
    },
    post: (path: string, body: any = null) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(body)
            })
            .then(responseBody)
            .catch((error) => { throw new Error(error) })
    }
};

export const Auth = {
    signIn: (obj: SignInObj, path = URLS.SIGNIN) => requests.post(path, obj),
    logout: (path = URLS.LOGOUT) => requests.post(path),
    signUp: (obj: SignUpObj, path = URLS.SIGNUP) => requests.post(path, obj),
    user: (path = URLS.USER_INFO) => requests.get(path)
};
