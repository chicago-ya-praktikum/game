import { createStyles, Theme } from "@material-ui/core";

export const styles = (theme: Theme) => createStyles({
    content: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    table: {
        maxWidth: '300px'
    },
    tableHead: {
        backgroundColor: theme.palette.grey[100]
    },
    mark: {
        backgroundColor: theme.palette.success.light    
    }
})

