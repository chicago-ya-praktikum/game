import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    withStyles
} from '@material-ui/core'
import React, {FC, useEffect, useState} from 'react'
import {LBItem, Props} from './types'
import {styles} from './styles'
import {ratingFieldName} from '../../contstants/ratingFieldName'
import {getTable} from './utils/getTable'
import {LeaderboardRequest} from '../../models/api/LeaderboardRequest'
import {Users} from '../../API'
import {userInfoSelector} from '../../store/selectors'

const Leaderboard: FC<Props> = (props: Props) => {
    const {classes} = props
    const [table, setTable] = useState<LBItem[]>(getTable())
    const user = userInfoSelector()

    useEffect(() => {
        Users.leaderboardAll(new LeaderboardRequest()).then(result => setTable(result))
    }, [])

    return (
        <Box className={classes.content}>
            <Typography
                align='center'
                variant='h5'
                display='inline'
            >
                Leaderboard
            </Typography>
            <TableContainer className={classes.tableContainer} >
                <Table className={classes.table} aria-label='simple table'>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>Login</TableCell>
                            <TableCell align='right'>Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.map(row => (
                            <TableRow
                                key={row.key?.toString()}
                                className={row.id === user?.id ? classes.mark : undefined}
                            >
                                <TableCell scope='row'>{row.login}</TableCell>
                                <TableCell align='right'>{row[ratingFieldName]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export const LeaderboardTSX = withStyles(styles)(Leaderboard)
