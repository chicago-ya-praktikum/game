import React, {
    FC, useCallback, useEffect, useReducer
} from 'react'
import {
    Box, Button, Switch, withStyles
} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {styles} from './styles'
import {InputOnBlur, Props} from './types'
import {AvatarUI} from '../../components/UI/AvatarUI/index'
import {ChangePasswordForm} from '../../components/forms/ChangePasswordForm/index'
import {reducer} from './reducer/reducer'
import {initialState} from './reducer/state'
import {
    fillFields, setField, setFieldErr, setInit
} from './reducer/actions'
import {checkFields} from '../../utils/checkFields'
import {postLogout, putProfile} from '../../store/reducers/user/thunks'
import {InputForm} from '../../components/UI/inputs/InputForm/index'
import {appThemeSelector, userInfoSelector} from '../../store/selectors'
// eslint-disable-next-line import/no-cycle
import {routeHome} from '../../components/routers/MainRouter/constants'
import {AppTheme} from '../../enums/AppTheme'
import {actionCreator} from '../../utils/actionCreator'
import {Actions} from '../../store/actions'
import {logIn} from '../Forum/utils'
import {OurApi} from '../../API'

const Profile: FC<Props> = (props: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {fields, init} = state
    const {classes, history} = props
    const dispatchStore = useDispatch()
    const info = userInfoSelector()
    const theme = appThemeSelector()

    const handleChange = useCallback(() => {
        const actionTheme = theme === AppTheme.Dark ? Actions.APP_THEME_LIGHT : Actions.APP_THEME_DARK
        const newTheme = theme === AppTheme.Dark ? AppTheme.Light : AppTheme.Dark

        dispatchStore(actionCreator(actionTheme))

        if (info) {
            logIn(info)
                .then(() => OurApi.setTheme(info.id, newTheme)
                    .then(() => window.alertShow('success', 'Saved')))
        }
    }, [theme])

    useEffect(() => {
        if (!info || init) return
        dispatch(fillFields(info, fields))
        dispatch(setInit())
    }, [info])

    const inputBlurHandler = useCallback((e: InputOnBlur) => {
        e.preventDefault()
        dispatch(setField(fields, String(e.target.name), String(e.target.value)))
    }, [fields])

    const submitForm = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const check = checkFields(fields)
        const {err, updateErr} = check
        if (err) {
            window.alertShow('error', 'Form is filled in incorrectly.')
            updateErr.forEach((name) => dispatch(setFieldErr(fields, name)))
            return
        }
        if (!info) return
        dispatchStore(putProfile(fields))
    }, [fields, info])

    const handleLogOut = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatchStore(postLogout())
            // @ts-ignore
            .then((success) => {if (success) history.push(routeHome)})
    }, [history])

    const RenderFields = () => (
        <>
            <InputForm field={fields.first_name} onBlur={inputBlurHandler}/>
            <InputForm field={fields.second_name} onBlur={inputBlurHandler}/>
            <InputForm field={fields.display_name} onBlur={inputBlurHandler}/>
            <InputForm field={fields.login} onBlur={inputBlurHandler}/>
            <InputForm field={fields.email} onBlur={inputBlurHandler}/>
            <InputForm field={fields.phone} onBlur={inputBlurHandler}/>
        </>
    )

    return (
        <Box className={classes.root}>
            <form className={classes.content}>
                <AvatarUI showBtn size='large'/>
                <RenderFields/>
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    onClick={submitForm}
                >
                    Save
                </Button>
            </form>

            <Switch
                checked={theme === AppTheme.Dark}
                onChange={handleChange}
                color='primary'
            />

            <Box className={classes.changePasswordForm}>
                <ChangePasswordForm/>
            </Box>
            <Box>
                <Button size='small' color='secondary' onClick={handleLogOut}>Log out</Button>
            </Box>

        </Box>
    )
}

export const ProfileTSX = withStyles(styles)(withRouter(Profile))
