import {Tree, TreeObj} from '../types'

export const getTree = (data: any): TreeObj => {
    const root : Tree = {
        id: 'root',
        name: 'Comments',
        content: '',
        children: []
    }
    const nodesStr: string[] = ['root']

    data.forEach((element: any) => {
        root.children?.push({
            id: String(element.id),
            name: String(element.userId),
            content: element.content,
            children: []
        })
        nodesStr.push(String(element.id))
    })

    return {root, nodes: nodesStr}
}
