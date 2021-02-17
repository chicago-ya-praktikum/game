import React, { FC, useState } from 'react'
import { Avatar, Box, Button, TextField, Typography, withStyles } from '@material-ui/core'
import { styles } from './styles'
import { Props } from './types'
import { validateInput } from '../../utils/validateInput'

const Profile: FC<Props> = (props: Props) => {

    const { classes } = props

    const [nickname,        setNickname]        = useState('')
    const [nicknameErr,     setNicknameErr]     = useState(false)
    const [gender,          setGender]          = useState('')
    const [genderErr,       setGenderErr]       = useState(false)
    const [age,             setAge]             = useState('')
    const [ageErr,          setAgeErr]          = useState(false)
    const [oldPassword,     setOldPassword]     = useState('')
    const [oldPasswordErr,  setOldPasswordErr]  = useState(false)
    const [newPassword,     setNewPassword]     = useState('')
    const [newPasswordErr,  setNewPasswordErr]  = useState(true)

    //const ava = useRef('')

    const onClickAvatar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

    }

    const onBlurHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        const inputValue = e.target.value as string
        const inputName = e.target.name as string

        const err = !validateInput(inputName, inputValue)

        switch (inputName) {
            case 'nickname':
                if (nicknameErr !== err) setNicknameErr(err)
                if (nickname !== inputValue) setNickname(nickname)
                break
            case 'gender':
                if (genderErr !== err) setGenderErr(err)
                if (gender !== inputValue) setGender(gender)
                break
            case 'age':
                if (ageErr !== err) setAgeErr(err)
                if (age !== inputValue) setAge(age)
                break
            case 'oldPassword':
                if (oldPasswordErr !== err) setOldPasswordErr(err)
                if (oldPassword !== inputValue) setOldPassword(oldPassword)
                break
            case 'newPassword':
                if (newPasswordErr !== err) setNewPasswordErr(err)
                if (newPassword !== inputValue) setNewPassword(newPassword)
                break
        }

    }

    return (
        <Box className={classes.content}>
            <Box className={classes.head}>
                <Typography align='center' variant='h5'>
                    Profile
                </Typography>
            </Box>

            <form className={classes.data}>
                <Box >
                    <Avatar ></Avatar>
                    <Button
                        variant='outlined'
                        color='primary'
                        type='submit'
                        size='small'
                        onClick={(e) => onClickAvatar(e)}
                    >Upload a photo</Button>
                    <input className={classes.inputFile} type='file' />
                </Box>
                <TextField
                    id='nickname'
                    name='nickname'
                    label='Nickname (required)'
                    variant='outlined'
                    error={nicknameErr}
                    onBlur={(e) => onBlurHandler(e)}/>
                {/* <TextField id='gender' label='Gender' error={genderErr} onBlur={onBlurHandler}/>
                <TextField id='age' label='Age' error={ageErr} onBlur={onBlurHandler}/> */}
            </form>

            <form className={classes.password}>
                {/* <TextField id='oldPassword' label='Old password (required)' error={oldPasswordErr} onBlur={onBlurHandler}/>
                <TextField id='newPassword' label='New password (required)' error={newPasswordErr} onBlur={onBlurHandler}/>

                <Button
                    variant='text'
                    color='primary'
                    type='submit'
                >SignUp</Button> */}

            </form>


        </Box>
    )
}

export const ProfileTSX = withStyles(styles)(Profile)
