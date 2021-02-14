import { createStyles } from "@material-ui/core";

export const styles = () => createStyles({
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
    }
})

