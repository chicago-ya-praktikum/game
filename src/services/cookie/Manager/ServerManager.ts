import {Request, Response} from 'express'
import {ICookieManager} from './ICookieManager'

export class ServerManager implements ICookieManager {
    private _req: Request
    private _res: Response

    constructor(req: Request, res: Response) {
        this._req = req
        this._res = res
    }

    get = (name: string) => this._req.cookies[name]

    getAll = () => this._req.cookies

    set = (name: string, value: string, days = 30) => {
        const maxAge = days * 24 * 60 * 60 * 1000
        this._res.cookie(name, value, {maxAge})
    }
}
