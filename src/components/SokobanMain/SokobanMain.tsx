import React, {memo, useEffect, useRef} from 'react'
import './SokobanMain.sass'
import {GameCore} from '../../utils/GameCore'
import {exampleLevel} from '../../constants/exampleLevel'

export const SokobanMain = memo(() => {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = ref.current

        if (canvas === null) {
            throw new Error('canvas is null')
        }

        const gameCore = new GameCore(canvas).drawLevel(exampleLevel)

        const fn = (event: KeyboardEvent) => gameCore.move(event)
        window.addEventListener('keydown', fn)

        return () => {
            window.removeEventListener('keydown', fn)
        }
    })

    return (
        <canvas
            height="400"
            width="400"
            ref={ref}
        />
    )
})
