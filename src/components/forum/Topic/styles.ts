import {createStyles} from '@material-ui/core'

export const styles = () => createStyles({
    root: {
        margin: '20px'
    },
    topicTitle: {
        display: 'flex',
        flexDirection: 'row'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    button_left: {
        margin: '0px 10px 0px 0px'
    },
    button_right: {
        margin: '0px 0px 0px 10px'
    }

})
