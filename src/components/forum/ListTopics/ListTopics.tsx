import React, {
    FC, useCallback, useEffect, useState
} from 'react'
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableRow, withStyles
} from '@material-ui/core'
import {styles} from './styles'
import {Props, RowTopic} from './types'
import {getListTopics} from './utils'
import {userInfoSelector} from '../../../store/selectors'

const ListTopics: FC<Props> = (props: Props) => {
    const {classes, cb} = props
    const userInfo = userInfoSelector()
    const [listTopics, setListTopics] = useState([] as RowTopic[])

    useEffect(() => {
        getListTopics(userInfo)
            .then((topicsList) => setListTopics(topicsList as RowTopic[]))
    }, [])

    const onClickTitle = useCallback(
        (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
            e.preventDefault()
            if (!cb) return
            const {id} = e.target as HTMLElement
            if (id.indexOf('#') < 0) return
            const topicId = Number(id.substring(id.indexOf('#') + 1))
            if (cb) cb(topicId)
        }, []
    )

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label='custom pagination table'>
                <TableBody>
                    {listTopics.map((row) => (
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
                                {`id: ${row.id}`}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export const ListTopicsTSX = withStyles(styles)(ListTopics)
