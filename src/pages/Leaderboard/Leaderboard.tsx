import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles, Box, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { getTable } from './utils/getTable'
import { Props } from './types'
import { styles } from './styles'

const Leaderboard: FC<Props> = (props: Props) => {
  
    const table = getTable()

    return (
      <Box className={props.classes.content}>
          <Typography className={props.classes.title} variant='h5'>Leaderboard</Typography>
          <TableContainer className={props.classes.tableContainer} >
              <Table className={props.classes.table} aria-label='simple table'>
                  <TableHead>
                      <TableRow>
                          <TableCell>Login</TableCell>
                          <TableCell align='right'>Points</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {table.map((row) => (
                          <TableRow key={row.id}>
                              <TableCell component='th' scope='row'>{row.login}</TableCell>
                              <TableCell align='right'>{row.points}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </Box>
    )
}

export default withStyles(styles)(Leaderboard)