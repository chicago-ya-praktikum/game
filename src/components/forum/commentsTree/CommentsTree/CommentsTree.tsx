import React, {
    FC, useCallback, useEffect, useMemo, useState
} from 'react'
import {Box, Typography, withStyles} from '@material-ui/core'
import {TreeItem, TreeView} from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {userInfoSelector} from '@state/selectors'
import {Props, Tree, TreeObj} from './types'
import {styles} from './styles'
import {Comment} from '../Comment/index'
import {saveComment, getComments, getTree} from './utils'

const CommentsTree: FC<Props> = (props: Props) => {
    const {classes, topicId} = props
    const userInfo = userInfoSelector()
    const [tree, setTree] = useState<TreeObj>(getTree())
    const [curCommentId, setCurCommentId] = useState(0)

    useEffect(() => {
        getComments(userInfo, topicId)
            .then((res) => setTree(getTree(res)))
    }, [topicId])

    const onNodeSelect = useCallback((_e: object, value: string[] | string) => {
        setCurCommentId(value === 'root' ? 0 : Number(value))
    }, [curCommentId])

    const onLabelClick = useCallback((e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault()
    }, [])

    const commentCb = useCallback((content?: string) => {
        if (content) {
            saveComment(
                userInfo,
                {
                    recordId: topicId,
                    content,
                    parentId: curCommentId
                }
            ).then(() => {
                getComments(userInfo, topicId)
                    .then((res) => setTree(getTree(res)))
            })
        }
    }, [curCommentId, topicId])

    const renderTree = (nodes: Tree) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={(
                <Box style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Typography>{nodes.name}</Typography>
                    &nbsp;
                    <Typography variant='subtitle2' color='textSecondary'>{nodes.date}</Typography>
                </Box>
            )}
            onLabelClick={onLabelClick}
        >
            {nodes.content && <Typography variant='body2'>{nodes.content}</Typography>}
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    )

    const expanded = useMemo(() => (tree ? tree.nodes : []), [tree.nodes])

    return (
        <>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                expanded={expanded}
                onNodeSelect={onNodeSelect}
            >
                {tree && renderTree(tree.root)}
            </TreeView>
            <Comment cb={commentCb}/>
        </>
    )
}
export const CommentsTreeTSX = withStyles(styles)(CommentsTree)
