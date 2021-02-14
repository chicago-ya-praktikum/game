import { LBItem } from '../types'

export const getTable = (): LBItem[] => {

    const table: LBItem[] = []
    
    table.push({ id: '1', login: 'Rupurt', points: 500, mark: false})
    table.push({ id: '2', login: 'Cecil',  points: 400, mark: false})
    table.push({ id: '3', login: 'Olga',   points: 300, mark: false})
    table.push({ id: '4', login: 'Rachel', points: 200, mark: false})
    table.push({ id: '5', login: 'Stas',   points: 100, mark: false})

    return table

}

export const getCurrentId = (): string => {

    return '3'
}
