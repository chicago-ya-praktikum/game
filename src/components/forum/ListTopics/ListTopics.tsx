import React, {FC, useCallback} from 'react'
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableRow, withStyles
} from '@material-ui/core'
import {styles} from './styles'
import {Props} from './types'

const ListTopics: FC<Props> = (props: Props) => {
    const {classes, cb} = props

    const onClickTitle = useCallback(
        (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
            e.preventDefault()
            if (!cb) return
            const {id} = e.target as HTMLElement
            if (id.indexOf('#') < 0) return
            if (cb) cb(id.substring(id.indexOf('#') + 1))
        }, []
    )

    function createData(id: string, title: string, autor: string) {
        return {id, title, autor}
    }

    const rows = [
        createData('1', 'Topic1', 'Stas'),
        createData('2', 'Topic2', 'Denis'),
        createData('3', 'Topic3', 'Oleg')
    ]

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label='custom pagination table'>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell
                                onClick={onClickTitle}
                                component='th'
                                scope='row'
                                id={`Topic#${row.id}`}
                            >
                                {row.title}
                            </TableCell>
                            <TableCell style={{width: 160}} align='right'>
                                {`autor: ${row.autor}`}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export const ListTopicsTSX = withStyles(styles)(ListTopics)
