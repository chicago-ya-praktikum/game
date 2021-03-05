import {memo} from 'react'
import {privateRoute} from '../../utils/privateRoute'
import {ForumTSX} from './Forum'

export const Forum = privateRoute(memo(ForumTSX))
