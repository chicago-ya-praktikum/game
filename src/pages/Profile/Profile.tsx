import React, { FC, useState } from 'react'
import { Avatar, Box, Typography, withStyles } from '@material-ui/core'
import { styles } from './styles'
import { Props } from './types'
import { UIInput } from '../../components/UI/UIInput/index'
import { validateInput } from '../../utils/validateInput'

const Profile: FC<Props> = (props: Props) => {

    const { classes } = props

    const [nickname, setNickname] = useState('')
    const [nicknameErr, setNicknameErr] = useState(false)

    const onBlurHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        setNicknameErr(true)

        const inputValue = e.target.value as string
        const inputName = e.target.name as string

        const valid = validateInput(inputName, inputValue)

        switch (inputName) {
            case 'nickname':
                if (nicknameErr !== valid) setNicknameErr(valid)
                if (nickname !== inputValue) setNickname(nickname)
                break
        }

    }

    return (
        <Box className={classes.content}>
            <Box className={classes.head}>
                <Typography
                    align='center'
                    variant='h5'
                >
                    Profile
                </Typography>
            </Box>

            <form>
                <Avatar></Avatar>
                <UIInput id='nickname' label='nickname' error={nicknameErr} onBlur={onBlurHandler}/>

            </form>

        </Box>
    )
}

export const ProfileTSX = withStyles(styles)(Profile)
