import React, {
    FC, useCallback, useEffect, useReducer
} from 'react'
import {
    Box, Button, TextField, withStyles
} from '@material-ui/core'
import _ from 'lodash'
import {styles} from './styles'
import {Props, InputOnBlur} from './types'
import {CommentsTree} from '../commentsTree/CommentsTree'
import {userInfoSelector} from '../../../store/selectors'
import {initialState} from './reducer/state'
import {reducer} from './reducer/reducer'
import {reset, setReadOnly} from './reducer/actions'
import {
    fillTopic, formIsValid, saveTopic, deleteTopic
} from './utils'
import {preSetField} from './reducer/preActions'

const Topic: FC<Props> = (props: Props) => {
    const {
        classes, cb, id, isNew
    } = props

    const [state, dispatch] = useReducer(reducer, _.cloneDeep(initialState))
    const {fields, readOnly} = state
    const {topicTitle, topicId, topicContent} = fields

    const userInfo = userInfoSelector()

    useEffect(() => {
        if (id) {
            fillTopic({
                fields, id, userInfo, dispatch
            })
        } else if (isNew) {
            dispatch(setReadOnly(false))
        }
    }, [])

    const inputBlurHandler = useCallback((e: InputOnBlur) => {
        e.preventDefault()
        dispatch(preSetField(fields, String(e.target.name), String(e.target.value)))
    }, [fields])

    const onClickSave = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!formIsValid(fields, dispatch)) return
        saveTopic(fields, userInfo, dispatch)
    }, [userInfo, fields])

    const onClickClose = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(reset())
        window.alertHide()
        cb()
    }, [])

    const onClickDelete = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        deleteTopic(fields, userInfo).then((sucess) => {
            if (sucess) {
                dispatch(reset())
                window.alertHide()
                cb()
            }
        })
    }, [])

    const RenderButtons = () => (
        <Box className={classes.buttons}>
            <Box>
                {!readOnly && (
                    <Button
                        className={classes.button_left}
                        color='primary'
                        variant='contained'
                        onClick={onClickSave}
                    >
                        Save
                    </Button>
                )}
                <Button
                    className={classes.button_left}
                    color='default'
                    variant='outlined'
                    onClick={onClickClose}
                >
                    Close
                </Button>
            </Box>
            <Box>
                {!readOnly && (
                    <Button
                        className={classes.button_right}
                        color='secondary'
                        variant='contained'
                        onClick={onClickDelete}
                    >
                        Delete
                    </Button>
                )}
            </Box>
        </Box>
    )

    const RenderFields = () => (
        <Box>
            <Box className={classes.topicTitle} >
                <TextField
                    name={topicTitle.id}
                    inputProps={{readOnly}}
                    margin='normal'
                    placeholder={topicTitle.label}
                    fullWidth
                    error={topicTitle.err}
                    defaultValue={topicTitle.val}
                    onBlur={inputBlurHandler}
                />
                <TextField
                    name={topicId.id}
                    inputProps={{
                        readOnly: true,
                        style: {
                            textAlign: 'center',
                            maxWidth: '30px'
                        }
                    }}
                    margin='dense'
                    variant='outlined'
                    placeholder={topicId.label}
                    defaultValue={topicId.val}
                />
            </Box>
            <TextField
                name={topicContent.id}
                inputProps={{readOnly}}
                fullWidth
                variant='outlined'
                placeholder={topicContent.label}
                defaultValue={topicContent.val}
                multiline
                rows={5}
                rowsMax={10}
                error={topicContent.err}
                onBlur={inputBlurHandler}
            />
        </Box>
    )

    return (
        <>
            <Box className={classes.root}>
                <RenderButtons/>
                <RenderFields/>
            </Box>
            <Box>
                {!!topicId.val && <CommentsTree/>}
            </Box>
        </>
    )
}

export const TopicTSX = withStyles(styles)(Topic)
