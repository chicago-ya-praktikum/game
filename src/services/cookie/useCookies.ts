import {useContext} from 'react'
import {CookiesContext} from './CookiesProvider/context'

export const useCookies = (name: string) => {
    const {manager} = useContext(CookiesContext)

    if (!manager) {
        throw new Error('Missing <CookiesProvider>')
    }

    if (name) {
        return [manager.get(name), manager.set.bind(manager, name)]
    }

    return [manager.getAll(), manager.set.bind(manager)]
}
