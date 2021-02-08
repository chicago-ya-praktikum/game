import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
      width: '50ch',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

export function RegForm() {
  const [state, setState] = useState({
    first_name: '',
  })

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const firstName = e.target.value as string
    setState({ first_name: firstName })
  }

  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const currentData = state
    console.log(currentData)
  }

  const classes = useStyles();

  return (
    <div className="form-wrapper">
      <div className="container">
        <div className="form-container">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="First name" variant="outlined" onChange={(e) => inputHandler(e)} />
            <TextField id="outlined-basic" label="Second Name" variant="outlined" />
            <TextField id="outlined-basic" label="Login" variant="outlined" />
            <TextField id="outlined-basic" label="E-mail" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />
            <TextField id="outlined-basic" label="Confirm password" variant="outlined" type="password" />
            <TextField id="outlined-basic" label="Phone" variant="outlined" />
            <Button variant="contained" color="primary" type="submit" onClick={(e) => submitForm(e)}>SignUp</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
