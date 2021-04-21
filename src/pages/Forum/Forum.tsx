import React, {
    FC, useCallback, useEffect, useState
} from 'react'
import {
    Box, Button, Container, Grid, withStyles
} from '@material-ui/core'
import {styles} from './styles'
import {Props} from './types'
import {Topic} from '../../components/forum/Topic/index'
import {ListTopics} from '../../components/forum/ListTopics/index'
import {userInfoSelector} from '../../store/selectors'
import {logIn} from './utils'

const Forum: FC<Props> = (props: Props) => {
    const {classes} = props
    const [topicRights, setTopicRights] = useState<'edit' | 'view'>('edit')
    const [pageAvailable, setPageAvailable] = useState(false)
    const userInfo = userInfoSelector()

    const [visibleTopic, setShowTopic] = useState(false)
    const [visibleListTopics, setShowListTopics] = useState(true)
    const [visibleHead, setShowHead] = useState(true)

    const [topicId, setTopicId] = useState(0)

    useEffect(() => {
        logIn(userInfo)
            .then((available) => setPageAvailable(available))
    }, [])

    const onClickNewTopic = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setTopicRights('edit')
        setShowTopic(true)
        setShowListTopics(false)
        setShowHead(false)
    }, [])

    const cbTopic = () => {
        setShowTopic(false)
        setShowListTopics(true)
        setShowHead(true)
        setTopicId(0)
    }

    const cbListTopics = (id: number) => {
        if (!id) return
        setTopicId(id)
        setTopicRights('view')
        setShowTopic(true)
        setShowListTopics(false)
        setShowHead(false)
    }

    if (!pageAvailable) {
        return <></>
    }

    const RenderHead = () => (
        <Grid container spacing={3} alignItems='center'>
            <Grid item sm={3}>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={onClickNewTopic}
                >
                    Create topic
                </Button>
            </Grid>
        </Grid>
    )

    return (
        <Box className={classes.root}>
            <Container fixed>
                {visibleHead && <RenderHead/>}
                {visibleTopic && <Topic rights={topicRights} id={topicId} cb={cbTopic}/>}
                {visibleListTopics && <ListTopics cb={cbListTopics}/>}
            </Container>
        </Box>
    )
}

export const ForumTSX = withStyles(styles)(Forum)
