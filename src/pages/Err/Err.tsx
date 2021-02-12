import React from 'react'
import { Button } from '@material-ui/core'

type Props = {
    error?: string,
    errorInfo?: string  
    hideBtn?: boolean  
}

export const Err = (props: Props) => {
    return (
        <div className='page-error'>
            <h1>{ props.error ? props.error : 'Sorry' }</h1>
            <h3>{ props.errorInfo ? props.errorInfo : 'Something went wrong' }</h3>
            { props.hideBtn ? null : <Button variant="contained" color="primary" type="submit" >Back</Button> }
        </div>
    )
}