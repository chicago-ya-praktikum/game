import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles, Box, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { getTable } from './utils/getTable'
import { getUserId } from './utils/getUserId'
import { Props } from './types'
import { styles } from './styles'

const Leaderboard: FC<Props> = (props: Props) => {

    const { classes } = props
    const table = getTable()
    const userId = getUserId()

    return (
      <Box className={classes.content}>
          <Typography className={classes.title} variant='h5'>Leaderboard</Typography>
          <TableContainer className={classes.tableContainer} >
              <Table className={classes.table} aria-label='simple table'>
                  <TableHead className={classes.tableHead}>
                      <TableRow>
                          <TableCell>Login</TableCell>
                          <TableCell align='right'>Points</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {table.map((row) => (
                          <TableRow 
                              key={row.id}
                              className={row.id === userId ? classes.mark : undefined }
                            >
                              <TableCell scope='row'>{row.login}</TableCell>
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