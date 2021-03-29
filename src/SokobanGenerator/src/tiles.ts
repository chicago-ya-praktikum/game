/* eslint-disable no-bitwise */
import {Tile} from '../enums/Tile'
import {ObjectKeys} from '../types/ObjectKeys'

const BOX_NO = 1
const PLAYER_NO = 2
const GOAL_NO = 4

const MAP_TO_NUM: ObjectKeys<number> = {
    [Tile.FLOOR]: 0,
    [Tile.PLAYER]: PLAYER_NO,
    [Tile.PLAYER_GOAL]: PLAYER_NO | GOAL_NO,
    [Tile.BOX]: BOX_NO,
    [Tile.BOX_GOAL]: BOX_NO | GOAL_NO,
    [Tile.GOAL]: GOAL_NO
}

const MAP_FROM_NUM = Object.keys(MAP_TO_NUM)
    .reduce((obj: ObjectKeys<string>, key) => {
        // eslint-disable-next-line no-param-reassign
        obj[MAP_TO_NUM[key]] = key
        return obj
    }, {})

export function isMovableTile(tile: Tile) {
    return !(tile === Tile.FLOOR || tile === Tile.WALL || tile === Tile.GOAL)
}

export function isWalkableTile(tile: Tile) {
    return tile === Tile.FLOOR || tile === Tile.GOAL
}

export function extractMovableTile(tile: string) {
    const num = MAP_TO_NUM[tile]

    if (!num) {
        return null
    }

    const res = MAP_FROM_NUM[(num & PLAYER_NO) || (num & BOX_NO)]
    return res === Tile.FLOOR ? null : res
}

export function removeMovableTile(tile: string): Tile {
    const num = MAP_TO_NUM[tile]

    if (!num) {
        return tile as Tile
    }

    return (num & GOAL_NO) ? Tile.GOAL : Tile.FLOOR
}

export function addMovableTile(tile: Tile, movable: Tile) {
    const tileNum = MAP_TO_NUM[tile]
    const movableNum = MAP_TO_NUM[movable]

    if (tileNum === undefined || movableNum === undefined) {
        return tile
    }

    return MAP_FROM_NUM[tileNum | movableNum]
}
