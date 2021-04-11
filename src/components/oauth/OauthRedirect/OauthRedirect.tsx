import {FC} from 'react'
import {useDispatch} from 'react-redux'
import {Props} from './types'
import {apiPostYandexOauth} from '../../../services/API/index'
import {getUserData} from '../../../store/reducers/user/thunks'

const OauthRedirect: FC<Props> = () => {
    const dispatchStore = useDispatch()
    if (IS_CLIENT) {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        if (code) {
            apiPostYandexOauth(code)
                .then((res) => {
                    if (res.data === 'OK') {
                        dispatchStore(getUserData())
                    } else {
                        window.alertShow('error', 'Something went wrong')
                    }
                })
        }
    }
    return (null)
}

export const OauthRedirectTSX = OauthRedirect
