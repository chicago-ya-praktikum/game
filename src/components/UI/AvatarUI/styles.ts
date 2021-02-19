import { createStyles, Theme } from "@material-ui/core";

export const styles = (theme: Theme) => createStyles({

    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        }
    },
    avatarSize: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    inputFile: {
        display: 'none'
    }

})
