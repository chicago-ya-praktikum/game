import React, {FC} from 'react'
import {Button, Typography, withStyles} from '@material-ui/core'
import {TreeItem, TreeView} from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Props} from './types'
import {styles} from './styles'

const CommentsTree: FC<Props> = (props: Props) => {
    const {classes} = props

    return (
        <>
            <Typography variant='h6'>
                Comments
            </Typography>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                <TreeItem nodeId='1' label='Applications'>
                    <TreeItem nodeId='2' label='Calendar'/>
                    <TreeItem nodeId='3' label='Chrome'/>
                    <TreeItem nodeId='4' label='Webstorm'/>
                </TreeItem>
                <TreeItem nodeId='5' label='Documents'>
                    <TreeItem nodeId='6' label='Material-UI'>
                        <TreeItem nodeId='7' label='src'>
                            <TreeItem nodeId='8' label='index.js'/>
                            <TreeItem nodeId='9' label='tree-view.js'/>
                        </TreeItem>
                    </TreeItem>
                </TreeItem>
            </TreeView>
            <Button
                size='small'
                color='primary'
            >
                Add comment
            </Button>
        </>
    )
}
export const CommentsTreeTSX = withStyles(styles)(CommentsTree)
