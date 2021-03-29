import {createStyles, Theme} from '@material-ui/core'

export const styles = (theme: Theme) => createStyles({
    root: {

        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        height: '100%',
        width: '100%'

    },
    content: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        minWidth: '300px',
        '& > *': {
            margin: theme.spacing(0.5)
        }
    },
    changePasswordForm: {
        margin: theme.spacing(5)
    }
})
