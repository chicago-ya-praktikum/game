import React, {FC} from 'react'
import {Typography, withStyles} from '@material-ui/core'
import {TreeItem, TreeView} from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {Props} from './types'
import {styles} from './styles'
import {Comment} from '../Comment/index'

type RenderTree = {
    id: string
    name: string
    text: string
    children?: RenderTree[]
}

const data: RenderTree = {
    id: 'root',
    name: 'Comments',
    text: '',
    children: [
        {
            id: '1',
            name: 'Child - 1',
            text: 'Child - 1'
        },
        {
            id: '3',
            name: 'Child - 3',
            text: 'Child - 3',
            children: [
                {
                    id: '4',
                    name: 'Child - 4',
                    text: 'Child - 4'
                }
            ]
        }
    ]
};

const CommentsTree: FC<Props> = (props: Props) => {
    const {classes} = props

    const renderTree = (nodes: RenderTree) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {nodes.text && <Typography variant='subtitle2'>{nodes.text}</Typography>}
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    )

    return (
        <>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                {renderTree(data)}
            </TreeView>
            <Comment/>
        </>
    )
}
export const CommentsTreeTSX = withStyles(styles)(CommentsTree)
