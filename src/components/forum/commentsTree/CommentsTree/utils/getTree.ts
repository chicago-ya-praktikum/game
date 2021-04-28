import {LooseObject} from '@types'
import {Tree, TreeObj} from '../types'

export const getTree = (data: any): TreeObj => {
    const root : Tree = {
        id: 'root',
        name: 'Comments',
        content: '',
        children: []
    }
    const nodes: string[] = ['root']
    const parents: LooseObject = ['root']
    parents[0] = root

    data.forEach((element: any) => {
        const leaf = {
            id: String(element.id),
            name: String(element.userId),
            content: element.content,
            children: []
        }
        const parent = parents[element.parentId]
        parent.children?.push(leaf)

        parents[element.id] = leaf
        nodes.push(String(element.id))
    })
    return {root, nodes}
}
