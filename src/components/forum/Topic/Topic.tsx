import React, {
    FC, useCallback, useRef, useState
} from 'react'
import {
    Box, Button, TextField, withStyles
} from '@material-ui/core'
import {styles} from './styles'
import {Props} from './types'
import {CommentsTree} from '../commentsTree/CommentsTree'
import {postCreateTipic} from '../../../services/API/db/topic'
import {userInfoSelector} from '../../../store/selectors'

const Topic: FC<Props> = (props: Props) => {
    const {classes, cb, rights} = props
    const disabledForm = rights ? rights === 'view' : true
    const refTopicTitle = useRef(null)
    const refTopicContent = useRef(null)
    const refTopicId = useRef(null)
    const [topicTitleErr, setTopicTitleErr] = useState(false)
    const [topicContentErr, setTopicContentErr] = useState(false)

    const userInfo = userInfoSelector()

    const onClickSave = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!userInfo) return
        const title = (refTopicTitle.current as unknown as HTMLInputElement).value
        const content = (refTopicContent.current as unknown as HTMLInputElement).value
        const id = Number((refTopicId.current as unknown as HTMLInputElement).value)

        if (!title) setTopicTitleErr(true)
        if (!content) setTopicContentErr(true)
        if (!title || !content) {
            window.alertShow('error', 'Topic is filled in incorrectly')
            return
        }
        setTopicTitleErr(false)
        setTopicContentErr(false)

        postCreateTipic(userInfo, {title, content, id}).then(
            (res) => {
                if (res.status === 201) {
                    (refTopicId.current as unknown as HTMLInputElement).value = res.data.id
                    window.alertShow('success', 'Topic created')
                } else if (res.status === 202) window.alertShow('success', 'Topic updated')
            }
        )
    }, [])

    const onClickClose = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (cb) cb()
    }, [])

    return (
        <>
            <Box className={classes.root}>
                <Box>
                    <Box className={classes.topicTitle} >
                        <TextField
                            disabled={disabledForm}
                            margin='normal'
                            placeholder='Topic title'
                            inputRef={refTopicTitle}
                            fullWidth
                            error={topicTitleErr}
                        />
                        <TextField
                            inputProps={{
                                readOnly: true,
                                style: {
                                    textAlign: 'center',
                                    maxWidth: '30px'
                                }
                            }}
                            margin='dense'
                            variant='outlined'
                            placeholder='ID'
                            inputRef={refTopicId}
                        />
                    </Box>
                    <TextField
                        disabled={disabledForm}
                        fullWidth
                        variant='outlined'
                        placeholder='Topic content'
                        multiline
                        rows={5}
                        rowsMax={10}
                        inputRef={refTopicContent}
                        error={topicContentErr}
                    />
                </Box>
                <Box className={classes.buttons}>
                    {!disabledForm && (
                        <Button
                            className={classes.button}
                            color='primary'
                            variant='contained'
                            onClick={onClickSave}
                        >
                            Save
                        </Button>
                    )}
                    <Button
                        className={classes.button}
                        color='default'
                        variant='outlined'
                        onClick={onClickClose}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
            <Box>
                {disabledForm && <CommentsTree/>}
            </Box>
        </>
    )
}

export const TopicTSX = withStyles(styles)(Topic)
