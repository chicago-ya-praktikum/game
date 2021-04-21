import React, {
    FC, useCallback, useReducer
} from 'react'
import {
    Box, Button, TextField, withStyles
} from '@material-ui/core'
import {styles} from './styles'
import {Props, InputOnBlur} from './types'
// import {CommentsTree} from '../commentsTree/CommentsTree'
// import {postCreateTopic, postUpdateTopic} from '../../../services/API/db/index'
import {userInfoSelector} from '../../../store/selectors'
import {initialState} from './reducer/state'
import {reducer} from './reducer/reducer'
// import {InputForm} from '../../UI/inputs/InputForm/index'
import {setField} from './reducer/actions'
import {formIsValid, saveTopic} from './utils/index'

const Topic: FC<Props> = (props: Props) => {
    const {classes, cb, rights, id} = props
    const readonlyForm = rights ? rights === 'view' : false

    const [state, dispatch] = useReducer(reducer, initialState)
    const {fields} = state
    const {topicTitle, topicId, topicContent} = fields

    const userInfo = userInfoSelector()

    useEffect(() => {
        if (id) {
            
        }
        // getListTopics(userInfo)
        //     .then((topicsList) => setListTopics(topicsList as RowTopic[]))
    }, [])
    
    const inputBlurHandler = useCallback((e: InputOnBlur) => {
        e.preventDefault()
        dispatch(setField(fields, String(e.target.name), String(e.target.value)))
    }, [fields])

    const onClickSave = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!formIsValid(fields, dispatch)) return
        if (!userInfo) return
        saveTopic(fields, userInfo, dispatch)
    }, [userInfo, fields])

    const onClickClose = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (cb) cb()
    }, [])

    const RenderButtons = () => (
        <Box className={classes.buttons}>
            <Box>
                {!readonlyForm && (
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
                {!readonlyForm && (
                    <Button
                        className={classes.button_right}
                        color='secondary'
                        variant='contained'
                        onClick={onClickClose}
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
                    inputProps={{readOnly: readonlyForm}}
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
                inputProps={{readOnly: readonlyForm}}
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
            {/* <Box>
                {!!topicId && <CommentsTree/>}
            </Box> */}
        </>
    )
}

export const TopicTSX = withStyles(styles)(Topic)
