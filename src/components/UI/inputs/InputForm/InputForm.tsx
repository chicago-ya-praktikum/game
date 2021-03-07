import React, {FC} from 'react'
import {TextField, withStyles} from '@material-ui/core'
import {styles} from './styles'
import {Props} from './types'

const InputForm: FC<Props> = (props: Props) => {
    const {field, onBlur} = props
    const {id, label} = field
    return (
        <>
            <TextField
                id={id}
                name={id}
                label={label}
                fullWidth
                error={field.err}
                onBlur={onBlur}
                defaultValue={field.val}
                type={field.type || ''}
            />
        </>
    )
}

export const InputFormTSX = withStyles(styles)(InputForm)
