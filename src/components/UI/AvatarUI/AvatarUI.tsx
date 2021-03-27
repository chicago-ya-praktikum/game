import React, {
    FC, useCallback, useEffect, useRef, useState
} from 'react'
import {
    Avatar, Box, Button, withStyles
} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {styles} from './styles'
import {Props, AvatarSizeStyle} from './types'
import {userInfoPropSelector} from '../../../store/selectors'
import {API_ROOT} from '../../../API'
import {getUserData, putAvatar} from '../../../store/reducers/user/thunks'

const AvatarUI: FC<Props> = (props: Props) => {
    const {classes, showBtn, size} = props
    const refAvatar = useRef(null)
    const pathAvatar = String(userInfoPropSelector('avatar'))
    const [srcAvatar, setSrcAvatar] = useState(pathAvatar ? API_ROOT + pathAvatar : '')
    const dispatchStore = useDispatch()

    const avatarClassName: AvatarSizeStyle = (size ? `${size}Size` : 'smallSize') as AvatarSizeStyle

    useEffect(() => {
        setSrcAvatar(pathAvatar ? API_ROOT + pathAvatar : '')
    }, [pathAvatar])

    const onClickAvatar = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const input = refAvatar.current as unknown as HTMLInputElement
        input.click()
    }, [refAvatar])

    const onChangeAvatar = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (e.target.files && !e.target.files.length) return
        const file = e.target.files[0]
        if (!file.type.match('image')) return
        const reader = new FileReader()
        reader.onload = () => {
            dispatchStore(putAvatar(file))
                // @ts-ignore
                .then(() => dispatchStore(getUserData()))
        }
        reader.readAsDataURL(file)
    }, [])

    return (
        <Box className={classes.root}>
            <Avatar
                className={classes[avatarClassName]}
                src={srcAvatar}
            />
            {showBtn && (
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    size='small'
                    id='upload-a-photo'
                    onClick={onClickAvatar}
                >
                    Upload a photo
                </Button>
            )}
            <input
                className={classes.inputFile}
                type='file'
                accept='.png, .jpg, .jpeg, .gif'
                onChange={onChangeAvatar}
                ref={refAvatar}
            />
        </Box>
    )
}

export const AvatarUITSX = withStyles(styles)(AvatarUI)
