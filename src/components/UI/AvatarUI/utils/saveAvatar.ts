import {Users} from '../../../../API'

export const saveAvatar = async (file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await Users.saveAvatar(formData)
    if (!response.ok) {
        const message = await response.json()
        window.alertShow('error', message.reason)
    }
}
