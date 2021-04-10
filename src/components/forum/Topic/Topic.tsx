import React, {FC, useCallback} from 'react'
import {
    Box, Button, TextField, withStyles
} from '@material-ui/core'
import {styles} from './styles'
import {Props} from './types'
import {CommentsTree} from '../CommentsTree'

const Topic: FC<Props> = (props: Props) => {
    const {classes, cb, rights} = props
    const disabledForm = rights ? rights === 'view' : true

    const onClickSave = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (cb) cb()
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
                        placeholder='Topic title'/>
                    <TextField
                        disabled={disabledForm}
                        fullWidth
                        placeholder='Topic body'
                        multiline
                        rows={5}
                        rowsMax={10}/>
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
