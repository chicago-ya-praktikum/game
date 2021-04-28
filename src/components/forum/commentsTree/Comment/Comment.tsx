import React, {
    FC, useCallback, useRef, useState
} from 'react'
import {
    Box, Button, TextField, withStyles
} from '@material-ui/core'
import {Props} from './types'
import {styles} from './styles'
import {formIsValid} from './utils'

const Comment: FC<Props> = (props: Props) => {
    const {classes, cb} = props
    const disabledForm = false

    const [show, setShow] = useState(false)
    const [contentErr, setContentErr] = useState(false)

    const refContent = useRef('')

    const onClickAddComment = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setShow(true)
    }, [])

    const onClickSave = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const input = refContent.current as unknown as HTMLInputElement
        const content = input.value
        if (!formIsValid(content)) {
            setContentErr(true)
            return
        }
        setContentErr(false)
        setShow(false)
        cb(content)
    }, [cb])

    const onClickClose = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setShow(false)
        cb()
    }, [])

    return (
        <>
            {!show && (
                <Button size='small' color='primary' onClick={onClickAddComment}>
                    Add comment
                </Button>
            )}
            {show && (
                <Box className={classes.root}>
                    <Box>
                        <TextField
                            disabled={disabledForm}
                            fullWidth
                            variant='outlined'
                            placeholder='Your comment'
                            multiline
                            rows={5}
                            rowsMax={10}
                            inputRef={refContent}
                            error={contentErr}
                        />
                    </Box>
                    <Box className={classes.buttons}>
                        <Button
                            className={classes.button}
                            color='primary'
                            variant='contained'
                            onClick={onClickSave}
                        >
                            Save
                        </Button>

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
            )}
        </>
    )
}
export const CommentTSX = withStyles(styles)(Comment)
