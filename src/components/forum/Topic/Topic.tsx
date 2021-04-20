import React, {FC, useCallback, useRef} from 'react'
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
    const refTopicBody = useRef(null)
    const userInfo = userInfoSelector()

    const onClickSave = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!userInfo) return
        const title = (refTopicTitle.current as unknown as HTMLInputElement).value
        const content = (refTopicBody.current as unknown as HTMLInputElement).value
        postCreateTipic(userInfo, {title, content}).then(
            (res) => {
                // if (res.status === 201) {
                    
                // } else {

                // }
            })

        // if (cb) cb()
    }, [])

    const onClickClose = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (cb) cb()
    }, [])

    return (
        <>
            <Box className={classes.root}>
                <Box>
                    <TextField
                        disabled={disabledForm}
                        margin='normal'
                        placeholder='Topic title'
                        inputRef={refTopicTitle}
                    />
                    <TextField
                        disabled={disabledForm}
                        fullWidth
                        variant='outlined'
                        placeholder='Topic body'
                        multiline
                        rows={5}
                        rowsMax={10}
                        inputRef={refTopicBody}
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
                        color='secondary'
                        variant='contained'
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
