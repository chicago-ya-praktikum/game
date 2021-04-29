import {createStyles} from '@material-ui/core'

export const styles = () => createStyles({
    root: {
        margin: '20px'
    },
    topicTitle: {
        display: 'flex',
        flexDirection: 'row'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    header_left: {
        margin: '0px 10px 0px 0px'
    },
    header_right: {
        margin: '0px 0px 0px 10px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }

})
