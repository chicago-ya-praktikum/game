import {sokobanGenerator} from '../SokobanGenerator/sokobanGenerator'

// eslint-disable-next-line no-restricted-globals
// const ctx = self as unknown as Worker
// eslint-disable-next-line no-restricted-globals
const ctx = self

ctx.addEventListener('message', (data) => {
    const level = sokobanGenerator(data.data)
    ctx.postMessage(level)
})
