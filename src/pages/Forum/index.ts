import {memo} from 'react'
import {privateRoute} from '../../HOCs/privateRoute'
import {ForumTSX} from './Forum'

export const Forum = privateRoute(memo(ForumTSX))
