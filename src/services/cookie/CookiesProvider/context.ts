import React from 'react'
import {ClientManager} from '../Manager/ClientManager'
import {ICookieManager} from '../Manager/ICookieManager'

type Context = {
    manager: ICookieManager
}

export const CookiesContext = React.createContext<Context>({manager: new ClientManager()})
