import React, {
    FC, useEffect, useRef, useState
} from 'react'
import {
    Avatar, Box, Button, withStyles
} from '@material-ui/core'
import {styles} from './styles'
import {Props} from './types'
import {putAvatar} from './utils/putAvatar'
// import {userAvatarSelector} from '../../../store/selectors'
// import {useTypedSelector} from '../../../hooks/useTypedSelector'

const AvatarUI: FC<Props> = (props: Props) => {
    const [avatarSrc, setAvatarSrc] = useState('')
    const [init, setInit] = useState(false)
    const {classes, showBtn} = props
    const refAvatar = useRef(null)
    // const pathAvatar = userAvatarSelector(useTypedSelector(rootState => rootState))

    useEffect(() => {
        if (init) return
        setInit(true)
        // setAvatarSrc(pathAvatar)
        // dispatchStore(getUserData())
    })

    const onClickAvatar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const input = refAvatar.current as unknown as HTMLInputElement
        input.click()
    }

    const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (!e.target.files?.length) return
        const file = e.target.files[0]
        if (!file.type.match('image')) return
        const reader = new FileReader()
        reader.onload = ev => {
            setAvatarSrc(String(ev.target?.result))
            putAvatar(file)
        }
        reader.readAsDataURL(file)
    }

    return (
        <Box className={classes.root}>
            <Avatar
                className={classes.avatarSize}
                src={avatarSrc}
            />
            {showBtn && (
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    size='small'
                    id='upload-a-photo'
                    onClick={(e) => onClickAvatar(e)}
                >
                    Upload a photo
                </Button>
            )}
            <input
                className={classes.inputFile}
                type='file'
                accept='.png, .jpg, .jpeg, .gif'
                onChange={(e) => onChangeAvatar(e)}
                ref={refAvatar}
            />
        </Box>
    )
}

export const AvatarUITSX = withStyles(styles)(AvatarUI)
