import React, {
    FC, useCallback, useEffect, useReducer
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
import {initialState} from './reducer/state'
import {reducer} from './reducer/reducer'
import {setAvailable, setVisibleList, setVisibleTopic} from './reducer/actions'

const Forum: FC<Props> = (props: Props) => {
    const {classes} = props
    const [state, dispatch] = useReducer(reducer, initialState)
    const {
        visible, available, topicId, newTopic
    } = state
    const userInfo = userInfoSelector()

    useEffect(() => {
        logIn(userInfo)
            .then((res) => {
                if (res) dispatch(setAvailable())
            })
    }, [])

    const onClickNewTopic = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(setVisibleTopic(0, true))
    }, [])

    const cbTopic = () => {
        dispatch(setVisibleList())
    }

    const cbListTopics = (selectedId: number) => {
        if (!selectedId) return
        dispatch(setVisibleTopic(selectedId))
    }

    if (!available) {
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
                {visible.head && <RenderHead/>}
                {visible.topic && <Topic id={topicId} isNew={newTopic} cb={cbTopic}/>}
                {visible.list && <ListTopics cb={cbListTopics}/>}
            </Container>
        </Box>
    )
}

export const ForumTSX = withStyles(styles)(Forum)
