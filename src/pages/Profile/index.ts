import {memo} from 'react'
import {privateRoute} from '../../HOCs/privateRoute'
import {ProfileTSX} from './Profile'

export const Profile = privateRoute(memo(ProfileTSX))
