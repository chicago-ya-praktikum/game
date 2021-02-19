import React, {
    memo, useCallback, useEffect, useRef, useState
} from 'react'
import './SokobanMain.sass'
import {Button} from '@material-ui/core'
import {GameCore} from '../../GameCore/GameCore'
import {SokobanGenerator} from '../../SokobanGenerator/SokobanGenerator'
import {LevelStore} from '../../GameCore/models/LevelStore'

export const SokobanMain = memo(() => {
    const ref = useRef<HTMLCanvasElement>(null)
    let gameCore: GameCore
    let level: LevelStore
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

        level = SokobanGenerator()
        gameCore = new GameCore(canvas).drawLevel(level)

        const fn = (event: KeyboardEvent) => gameCore.move(event)

        gameCore.end.subscribe(end)
        window.addEventListener('keydown', fn)

        return () => {
            window.removeEventListener('keydown', fn)
            gameCore.end.unsubscribe(end)
        }
    }, [])

    const restart = useCallback(() => {
        gameCore.drawLevel(level)
    }, [])

    const next = useCallback(() => {
        game()
        level = SokobanGenerator()
        gameCore.drawLevel(level)
    }, [])

    return (
        <>
            <div className={gameClass}>
                <div className="row">
                    <Button onClick={restart}>Restart</Button>
                    <Button onClick={next}>Next</Button>
                </div>
                <canvas
                    className="bordered"
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
