import {ImageStore} from './ImageStore'

export const gameImage = IS_SERVER ? null : new ImageStore()
