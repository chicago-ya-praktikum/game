import {memo} from 'react'
import {privateRoute} from '../../HOCs/privateRoute'
// eslint-disable-next-line import/no-cycle
import {ProfileTSX} from './Profile'

export const Profile = privateRoute(memo(ProfileTSX))
