import React, {
    FC, useCallback, useEffect, useState
} from 'react'
import {
    Box, Button, Menu, MenuItem, withStyles
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import {userInfoSelector} from '@state/selectors'
import {LooseObject} from '@types'
import {Props} from './types'
import {styles} from './styles'
import {getReactions} from './utils'

const iconsСomp: LooseObject = {
    ThumbUpIcon: <ThumbUpIcon/>,
    ThumbDownIcon: <ThumbDownIcon/>,
    ThumbsUpDownIcon: <ThumbsUpDownIcon/>,
    SentimentSatisfiedAltIcon: <SentimentSatisfiedAltIcon/>,
    SentimentVeryDissatisfiedIcon: <SentimentVeryDissatisfiedIcon/>
}

const ReactionsPanel: FC<Props> = (props: Props) => {
    const {classes} = props
    const [anchorEl, setAnchorEl] = useState(null)
    const [icons, setIcons] = useState([])
    const userInfo = userInfoSelector()

    useEffect(() => {
        getReactions(userInfo)
            .then((res) => setIcons(res))
    }, [])

    const handleClick = useCallback((e: any) => {
        setAnchorEl(e.currentTarget)
    }, [])

    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const addIcon = useCallback((key: string) => {
        console.log('key', key)
        handleClose()
    }, [])

    return (
        <Box className={classes.root}>
            <Button
                className='button_margin'
                aria-controls='reactions-menu'
                aria-haspopup='true'
                onClick={handleClick}
                style={{padding: '0px'}}
            >
                <AddIcon/>
            </Button>
            <Box className={classes.icon}>
                <ThumbUpIcon/>
                1
            </Box>
            <Box className={classes.icon}>
                <ThumbUpIcon/>
                1
            </Box>
            <Box className={classes.icon}>
                <ThumbUpIcon/>
                1
            </Box>

            <Menu
                id='reactions-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {icons.map((item: any) => (
                    iconsСomp[item.iconName] && (
                        <MenuItem
                            key={item.iconName}
                            onClick={() => addIcon(item.iconName)}>{
                                iconsСomp[item.iconName]
                            }
                        </MenuItem>
                    )
                ))}
            </Menu>
        </Box>
    )
}

export const ReactionsPanelTSX = withStyles(styles)(ReactionsPanel)
