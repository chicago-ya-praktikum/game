import {API_ROOT} from '../../../../contstants/index'

export const getAvatarPath = (pathAvatar: string) => (
    pathAvatar ? `${API_ROOT}/api/v2/resources${pathAvatar}` : '')
