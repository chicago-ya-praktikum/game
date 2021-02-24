import React, {FC, useCallback, useState} from 'react'
import {
    Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, withStyles
} from '@material-ui/core'
import ReactInputMask from 'react-input-mask'
import {Alert} from '@material-ui/lab'
import {styles} from './styles'
import {Field, Props, Setter} from './types'
import {validateInput} from '../../utils/validateInput'
import {AvatarUI} from '../../components/UI/AvatarUI/index'
import {ChangePasswordForm} from '../../components/UI/ChangePasswordForm/index'

const Profile: FC<Props> = (props: Props) => {
    const [nickname, setNickname] = useState({val: '', err: true, required: true} as Field)
    const [avatarSrc, setAvatarSrc] = useState({val: '', err: true, required: true} as Field)
    const [gender, setGender] = useState({val: '', err: false} as Field)
    const [age, setAge] = useState({val: '18', err: false} as Field)
    const [showAlert, setShowAlert] = useState(false)

    const {classes} = props

    const inputBlurHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: Field, setter: Setter) => {
        const curr = e.target.value as string
        if (curr === field.val) return
        const err = !validateInput(e.target.name as string, curr, field.required)
        if (err !== field.err) field.err = err
        field.val = curr
        setter({...field})
    }, [])

    const selectChangeHandler = useCallback((e: React.ChangeEvent<{ name?: string; value: unknown }>, field:Field, setter: Setter) => {
        const curr = e.target.value as string
        if (curr === field.val) return
        field.val = curr
        setter({...field})
    }, [])

    const avatarCallback = useCallback((src: string) => {
        if (src && src !== avatarSrc.val) {
            avatarSrc.val = src
            avatarSrc.err = false
            setAvatarSrc({...avatarSrc})
        }
    }, [])


    const formIsValid = () => {
        let res = true
        const fields = [nickname, avatarSrc, gender, age]
        fields.forEach((field) => (
            res = res && !field.err
        ))

        return res
    }

    const submitForm = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (!formIsValid()) {
            setShowAlert(true)
            return
        }

        setShowAlert(false)

        // TODO: save data
    }, [])

    const handleAlertClose = useCallback(() => {
        setShowAlert(false)
    }, [])


    return (
        <Box className={classes.root}>
            {showAlert && <Alert className={classes.alert} severity='error' onClose={handleAlertClose}>Fields are not filled in correctly!</Alert>}
            <Box>
                <Typography align='center' variant='h5'>
                    Profile
                </Typography>
            </Box>
            <form className={classes.content}>
                <AvatarUI cb={avatarCallback} showBtn={true}/>
                <TextField
                    id='nickname'
                    name='nickname'
                    label='Nickname (required)'
                    fullWidth
                    variant='outlined'
                    error={nickname.err}
                    onBlur={(e) => inputBlurHandler(e, nickname, setNickname)}
                />
                <FormControl
                    variant='outlined'
                    fullWidth
                >
                    <InputLabel id='gender-select-label'>Gender</InputLabel>
                    <Select
                        labelId='gender-select-label'
                        id='gender-select'
                        defaultValue=''
                        onChange={(e) => selectChangeHandler(e, gender, setGender)}
                        label='Gender'
                    >
                        <MenuItem value=''><em>None</em></MenuItem>
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                    </Select>
                </FormControl>
                <ReactInputMask
                    mask='99'
                    defaultValue='18'
                    maskPlaceholder={null}
                    onBlur={(e) => inputBlurHandler(e, age, setAge)}
                >
                    {() => <TextField
                                id='age'
                                label='age'
                                fullWidth
                                name='age'
                                variant='outlined'
                            />}
                </ReactInputMask>
                <Button
                    variant='contained'
                    color='primary' type='submit'
                    onClick={(e) => submitForm(e)}
                >Save</Button>

            </form>
            <Box className={classes.changePasswordForm}>
                <ChangePasswordForm/>
            </Box>

        </Box>
    )
}

export const ProfileTSX = withStyles(styles)(Profile)
