import React, {FC, useCallback, useState} from 'react'
import {
    Box, Button, TextField, withStyles
} from '@material-ui/core'
import {Props} from './types'
import {styles} from './styles'

const Comment: FC<Props> = (props: Props) => {
    const {classes} = props
    const disabledForm = false
    const [show, setShow] = useState(false)

    const onClickAddComment = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setShow(true)
        // if (cb) cb()
    }, [])

    const onClickSave = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setShow(false)
        // if (cb) cb()
    }, [])

    const onClickClose = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setShow(false)
        // if (cb) cb()
    }, [])

    return (
        <>
            <Button size='small' color='primary' onClick={onClickAddComment}>
                Add comment
            </Button>
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
                            rowsMax={10}/>
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
