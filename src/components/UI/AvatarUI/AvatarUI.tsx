import React, {FC, useRef, useState} from 'react'
import {Avatar, Box, Button, withStyles} from '@material-ui/core'
import {styles} from './styles'
import {Props} from './types'

const AvatarUI: FC<Props> = (props: Props) => {

    const { classes } = props

    const [avatarSrc, setAvatarSrc] = useState('')

    const refAvatar = useRef(null)

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
            setAvatarSrc(ev.target?.result as string)
            if (props.cb) props.cb(ev.target?.result as string)
        }
        reader.readAsDataURL(file)
    }


    return (
        <Box className={classes.root}>
            <Avatar
                className={classes.avatarSize}
                src={avatarSrc}
            />
            {props.showBtn &&
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    size='small'
                    id='upload-a-photo'
                    onClick={(e) => onClickAvatar(e)}
                >Upload a photo</Button>}
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
