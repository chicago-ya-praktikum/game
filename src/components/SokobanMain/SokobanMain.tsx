import React, {
    memo, useCallback, useEffect, useRef, useState
} from 'react'
import './SokobanMain.sass'
import {Button} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {GameCore} from '../../GameCore/GameCore'
import {LevelStore} from '../../GameCore/models/LevelStore'
import {levelGenerator} from '../../webWorkers/levelGenerator'
import {themeSelector} from '../../store/selectors'
import {ThemeReducer} from '../../store/reducers/gameThemeReduser'
import {actionCreator} from '../../utils/actionCreator'
import {Actions} from '../../store/actions'

export const SokobanMain = memo(() => {
    const ref = useRef<HTMLCanvasElement>(null)
    let gameCore: GameCore
    const [levels, setLevels] = useState<LevelStore[]>([])
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

    const theme: ThemeReducer = themeSelector()

    useEffect(() => {
        const canvas = ref.current

        if (canvas === null) {
            throw new Error('canvas is null')
        }

        gameCore = new GameCore(canvas)
        gameCore.end.subscribe(end)
        const fn = (event: KeyboardEvent) => gameCore.move(event, theme)
        window.addEventListener('keydown', fn)

        levelGenerator.postMessage(true)
        const generatorCallback = ({data}: MessageEvent<LevelStore>) => {
            if (levels.length < 1) {
                gameCore.drawLevel(data, theme)
            }

            levels.push(data)
            setLevels([...levels])

            if (levels.length < 11) {
                levelGenerator.postMessage(true)
            }
        }
        levelGenerator.addEventListener('message', generatorCallback)

        return () => {
            window.removeEventListener('keydown', fn)
            gameCore.end.unsubscribe(end)
            levelGenerator.removeEventListener('message', generatorCallback)
        }
    }, [theme])

    const restart = useCallback(() => {
        gameCore.drawLevel(levels[0], theme)
    }, [theme])

    const next = useCallback(() => {
        game()

        levels.shift()
        setLevels([...levels])

        levelGenerator.postMessage(true)
        gameCore.drawLevel(levels[0], theme)
    }, [theme])

    const dispatch = useDispatch()

    const switchToStone = () => {
        dispatch(actionCreator(Actions.SWITCH_TO_STONE_THEME))
    }

    const switchToSand = () => {
        dispatch(actionCreator(Actions.SWITCH_TO_SAND_THEME))
    }

    return (
        <>
            <div className={gameClass}>
                <div className='row'>
                    <Button disabled={levels.length < 1} onClick={restart}>Restart</Button>
                    <Button disabled={levels.length < 2} onClick={next}>Next</Button>
                    <Button onClick={switchToStone}>Stone</Button>
                    <Button onClick={switchToSand}>Sand</Button>
                </div>
                <canvas
                    className='bordered'
                    height='400'
                    width='400'
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
