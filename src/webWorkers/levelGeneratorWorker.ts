import {sokobanGenerator} from '../SokobanGenerator/sokobanGenerator'

const ctx = self as unknown as Worker

ctx.addEventListener('message', () => {
    const level = sokobanGenerator()
    ctx.postMessage(level)
})
