import React, {memo, useCallback, useEffect, useRef, useState} from 'react'
import './SokobanMain.sass'
import {Button} from '@material-ui/core'
import {GameCore} from '../../GameCore/GameCore'
import {exampleLevel} from '../../GameCore/constants/exampleLevel'

export const SokobanMain = memo(() => {
    const ref = useRef<HTMLCanvasElement>(null)
    let gameCore: GameCore
    const [gameClass, setGameClass] = useState('block')
    const [endClass, setEndClass] = useState('hide')

    const end = () => {
        setGameClass('hide')
        setEndClass('block')
    }

    const game = () => {
        setGameClass('block')
        setEndClass('hide')
    }

    useEffect(() => {
        const canvas = ref.current

        if (canvas === null) {
            throw new Error('canvas is null')
        }

        gameCore = new GameCore(canvas).drawLevel(exampleLevel)

        const fn = (event: KeyboardEvent) => gameCore.move(event)

        gameCore.end.subscribe(end)
        window.addEventListener('keydown', fn)

        return () => {
            window.removeEventListener('keydown', fn)
            gameCore.end.unsubscribe(end)
        }
    }, [])

    const restart = useCallback(() => {
        gameCore.drawLevel(exampleLevel)
    }, [])

    const next = useCallback(() => {
        game()
        gameCore.drawLevel(exampleLevel)
    }, [])

    return (
        <>
            <div className={gameClass}>
                <div className="row">
                    <Button onClick={restart}>Restart</Button>
                    <Button onClick={next}>Next</Button>
                </div>
                <canvas
                    height="400"
                    width="400"
                    ref={ref}
                />
            </div>

            <div className={endClass}>
                <h2>Success!</h2>
                <Button onClick={next}>Next</Button>
            </div>
        </>
    )
})
