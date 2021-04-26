import React, {
    FC, useCallback, useEffect, useState
} from 'react'
import {Typography, withStyles} from '@material-ui/core'
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
    const [tree, setTree] = useState<TreeObj>()
    const [curCommentId, setCurCommentId] = useState(0)

    console.log('render currentCommentId', curCommentId)

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

    const commentCb = (content?: string) => {
        console.log('commentCb currentCommentId', curCommentId)
        if (content) {
            saveComment(
                userInfo,
                {
                    recordId: topicId,
                    content,
                    parentId: curCommentId
                }
            ).then((saved) => {
                if (saved) {
                    getComments(userInfo, topicId)
                        .then((res) => setTree(getTree(res)))
                }
            })
        }
    } // , [curCommentId, topicId])

    const renderTree = (nodes: Tree) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={nodes.name}
            onLabelClick={onLabelClick}
        >
            {nodes.content && <Typography variant='subtitle2'>{nodes.content}</Typography>}
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    )

    return (
        <>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                // expanded={tree ? tree.nodes : undefined}
                onNodeSelect={onNodeSelect}
            >
                {tree && renderTree(tree.root)}
            </TreeView>
            <Comment cb={commentCb}/>
        </>
    )
}
export const CommentsTreeTSX = withStyles(styles)(CommentsTree)
