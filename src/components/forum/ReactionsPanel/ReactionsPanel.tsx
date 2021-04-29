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
import {getReactions, postUserReactions, getTopicReactions} from './utils'

const getIcon = (id: number, iconsUser: number[]) => {
    const color = iconsUser.includes(id) ? 'disabled' : 'inherit'
    const iconsСomp: LooseObject = {
        1: <ThumbUpIcon color={color}/>,
        2: <ThumbDownIcon color={color}/>,
        3: <ThumbsUpDownIcon color={color}/>,
        4: <SentimentSatisfiedAltIcon color={color}/>,
        5: <SentimentVeryDissatisfiedIcon color={color}/>
    }

    return iconsСomp[id]
}

const ReactionsPanel: FC<Props> = (props: Props) => {
    const {classes, topicId} = props
    const [anchorEl, setAnchorEl] = useState(null)
    const [icons, setIcons] = useState([])

    const [iconsActive, setIconsActive] = useState({iconsUser: [], iconsCommon: []})
    const {iconsUser, iconsCommon} = iconsActive

    const userInfo = userInfoSelector()

    const getActveIcons = useCallback(() => {
        getTopicReactions(userInfo, topicId)
            .then((res) => {
                setIconsActive({
                    iconsUser: res.user,
                    iconsCommon: res.common
                })
            })
    }, [iconsCommon])

    useEffect(() => {
        getReactions(userInfo)
            .then((res) => setIcons(res))
    }, [])

    useEffect(() => {
        getActveIcons()
    }, [topicId])

    const handleClick = useCallback((e: any) => {
        setAnchorEl(e.currentTarget)
    }, [])

    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const addRemoveIcon = useCallback((key: string) => {
        postUserReactions(userInfo, {
            recordId: topicId,
            reactionId: Number(key)
        }).then(() => {
            getActveIcons()
        })
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
            {iconsCommon.map((item: any) => (
                getIcon(item.reactionId, iconsUser) && (
                    <Box
                        className={classes.icon}
                        key={item.reactionId}
                        onClick={() => addRemoveIcon(item.reactionId)}
                    >
                        {getIcon(item.reactionId, iconsUser)}
                        {item.count_userId}
                    </Box>
                )
            ))}
            <Menu
                id='reactions-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {icons.map((item: any) => (
                    getIcon(item.id, iconsUser) && (
                        <MenuItem
                            key={item.id}
                            onClick={() => addRemoveIcon(item.id)}>{
                                getIcon(item.id, iconsUser)
                            }
                        </MenuItem>
                    )
                ))}
            </Menu>
        </Box>
    )
}

export const ReactionsPanelTSX = withStyles(styles)(ReactionsPanel)
