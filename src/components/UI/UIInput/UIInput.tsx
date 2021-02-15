import React, { FC } from 'react'
import { TextField, withStyles } from '@material-ui/core'
import { styles } from './styles'
import { Props, FunctionOnBlur } from './types'

const UIInput: FC<Props> = (props: Props) => {

    return (

        <TextField
            error       ={props.error}
            color       ={props.color || 'primary'}
            id          ={props.id}
            name        ={props.name || props.id}
            label       ={props.label}
            onBlur      ={props.onBlur ? (e) => (props.onBlur as FunctionOnBlur)(e) : undefined}
            variant     ='outlined'
        />

    )
}

export const UIInputTSX = withStyles(styles)(UIInput)
