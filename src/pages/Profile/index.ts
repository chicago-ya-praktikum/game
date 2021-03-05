import {memo} from 'react'
import {privateRoute} from '../../utils/privateRoute'
import {ProfileTSX} from './Profile'

export const Profile = privateRoute(memo(ProfileTSX))
