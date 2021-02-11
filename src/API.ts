const API_ROOT = new URL('https://ya-praktikum.tech')

const responseBody = (res: { body: any; }) => res.body;

const requests = {
    del: (path: string) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
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
                }
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
                body
            })
            .then(responseBody)
            .catch((error) => { throw new Error(error) })
    },
    post: (path: string, body: any) => {
        const url = new URL(path, API_ROOT)
        return fetch(`${url}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            })
            .then(responseBody)
            .catch((error) => { throw new Error(error) })
    }
};

export const Auth = {
    signIn: (path = '/auth/signin') => requests.post(path, {}),
    logout: (path = '/auth/logout') => requests.post(path, {}),
    signUp: (first_name: string, second_name: string, email: string, login: string, password: string, phone: string, path = '/api/v2/auth/signup') => requests.post(path,
        JSON.stringify({
            first_name,
            second_name,
            email,
            login,
            password,
            phone
        }))
};
