import {API_ROOT, URL_AUTH, URL_USER} from './contstants/ya/index'
import {LeaderboardNewLeaderRequest} from './models/api/LeaderboardNewLeaderRequest'
import {LeaderboardRequest} from './models/api/LeaderboardRequest'
import {LBItem} from './pages/Leaderboard/types'
import {URL_USER as API_URL_USER, API_ROOT as API_API_ROOT} from './contstants/db'
import {ThemeResponse} from './models/api/ThemeResponse'
import {deepClone} from '@utils'
import {AppTheme} from './enums/AppTheme'

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

const fetchInit: RequestInit = {
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
}

const responseBody = (res: {json: () => any}) => res.json()
const onResponse = (response: Response) => response

const withUrl = <T>(
    path: string, method: string, body?: unknown, apiPath = API_ROOT, userId?: number
): Promise<T> => {
    const clone = deepClone(fetchInit)

    if (userId !== undefined) {
        // @ts-ignore
        clone.headers.authorization = userId
    }

    return fetch(
        path + apiPath,
        {method, body: JSON.stringify(body), ...clone}
    // eslint-disable-next-line no-console
    ).then(response => response.json()).catch(error => console.log(error))
}

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
    alternativePost: <T>(
        path: string, body: unknown, apiPath = API_ROOT, userId?: number
    ) => withUrl<T>(
        path,
        'POST',
        body,
        apiPath,
        userId
    ),
    alternativeGet: <T>(path: string, apiPath: string, userId?: number) => withUrl<T>(
        path,
        'GET',
        undefined,
        apiPath,
        userId
    ),
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
    putProfile: (obj: UserPutData, path = URL_USER.PUT_PROFILE) => requests.put(path, obj),
    leaderboard: (body: LeaderboardNewLeaderRequest) => requests.alternativePost(
        URL_USER.LEADERBOARD, body
    ),
    leaderboardAll: (body: LeaderboardRequest) => requests.alternativePost<{data: LBItem}[]>(
        URL_USER.LEADERBOARD_ALL, body
    ).then(result => result
        .map((item, key) => Object.assign(item.data, {key})))
}

export class OurApi {
    static theme(userId: number) {
        return requests.alternativeGet<ThemeResponse>(API_URL_USER.THEME, API_API_ROOT, userId)
    }

    static setTheme(userId: number, themeName: AppTheme) {
        return requests
            .alternativePost<ThemeResponse>(
                API_URL_USER.THEME, {themeName}, API_API_ROOT, userId
            )
    }
}
