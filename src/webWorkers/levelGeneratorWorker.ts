import {SokobanGenerator} from '../SokobanGenerator/SokobanGenerator'

const ctx = self as unknown as Worker

ctx.addEventListener('message', () => {
    const level = SokobanGenerator()
    ctx.postMessage(level)
})
