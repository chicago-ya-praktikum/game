const API_ROOT = 'https://ya-praktikum.tech/api/v2';

const responseBody = (res: { body: any; }) => res.body;

const requests = {
    del: (url: string) => fetch(`${API_ROOT}${url}`,
        {
            method: 'DELETE'
        })
        .then(responseBody)
        .catch(() => { }),
    get: (url: any) => fetch(`${API_ROOT}${url}`,
        {
            method: 'GET'
        })
        .then(responseBody)
        .catch(() => { }),
    patch: (url: any, body: any) => fetch(`${API_ROOT}${url}`,
        {
            method: 'PATCH',
            body
        })
        .then(responseBody)
        .catch(() => { }),
    post: (url: any, body: any) => fetch(`${API_ROOT}${url}`,
        {
            method: 'POST',
            body
        })
        .then(responseBody)
        .catch(() => { })
};

export const Auth = {
    signIn: (path = '/auth/signin') => requests.post(path, {}),
    logout: (path = '/api/v1.0/auth/logout') => requests.post(path, {}),
    signUp: (firstName: string, secondName: string, email: string, login: string, password: string, phone: string, path = '/auth/signup') => requests.post(path, {
                first_name: firstName,
                second_name: secondName,
                email: email,
                login: login,
                password: password,
                phone: phone
    })
};
