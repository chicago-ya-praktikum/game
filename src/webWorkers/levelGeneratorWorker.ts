import {sokobanGenerator} from '../SokobanGenerator/sokobanGenerator'

// eslint-disable-next-line no-restricted-globals
// const ctx = self as unknown as Worker
// eslint-disable-next-line no-restricted-globals
const ctx = self

ctx.addEventListener('message', ({data}: MessageEvent<number>) => {
    const level = sokobanGenerator(data)
    ctx.postMessage(level)
})
