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
import {postCreateUser} from '../../services/API/database/index'
import {userSelector} from '../../store/selectors'

const Forum: FC<Props> = (props: Props) => {
    const {classes} = props
    const [topic, setTopic] = useState(false)
    const [err, setErr] = useState('')
    const [listTopics, setListTopics] = useState(true)
    const [topicRights, setTopicRights] = useState<'edit' | 'view'>('edit')
    const {info} = userSelector()

    useEffect(() => {if (err) throw new Error(err)})

    useEffect(() => {
        if (info) {
            postCreateUser(info)
                .then((res) => {
                    if (res.status !== 201 && res.status !== 409) {
                        if (res.status === 401) {
                            setErr(res.statusText)
                        } else {
                            window.alertShow('error', res.statusText)
                        }
                    }
                })
        }
    }, [info])

    const onClickNewTopic = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setTopicRights('edit')
        setTopic(true)
        setListTopics(false)
    }, [])

    const onTopic = () => {
        setTopic(false)
        setListTopics(true)
    }

    const onListTopics = (topicId: string) => {
        setTopicRights('view')
        setTopic(true)
        setListTopics(false)
        console.log('topicId', topicId)
    }

    return (
        <Box className={classes.root}>
            <Container fixed>
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
                {topic && (<Topic rights={topicRights} cb={onTopic}/>)}
                {listTopics && <ListTopics cb={onListTopics}/>}
            </Container>
        </Box>
    )
}

export const ForumTSX = withStyles(styles)(Forum)
