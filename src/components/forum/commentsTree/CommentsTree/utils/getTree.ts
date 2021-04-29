import {LooseObject} from '@types'
import {remakePgDate} from '@utils'
import {Tree, TreeObj} from '../types'

export const getTree = (data?: any): TreeObj => {
    const root : Tree = {
        id: 'root',
        name: 'Comments',
        content: '',
        date: '',
        children: []
    }

    if (!data) return {root, nodes: []}

    const nodes: string[] = ['root']
    const parents: LooseObject = ['root']
    parents[0] = root

    data.forEach((element: any) => {
        const leaf = {
            id: String(element.id),
            name: element.user.displayName,
            content: element.content,
            date: remakePgDate(element.createdAt),
            children: []
        }

        const parent = parents[element.parentId]
        parent.children?.push(leaf)

        parents[element.id] = leaf
        nodes.push(String(element.id))
    })

    return {root, nodes}
}
