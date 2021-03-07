import {createStyles, Theme} from '@material-ui/core'

export const styles = (theme: Theme) => createStyles({
    dialogContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'stretch',
        flexDirection: 'column',
        padding: '10px',
        minWidth: '300px',
        '& > *': {
            margin: theme.spacing(0.5)
        }
    }
})
