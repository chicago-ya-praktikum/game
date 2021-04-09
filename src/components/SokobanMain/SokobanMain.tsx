import React, {
    memo, useCallback, useEffect, useRef, useState
} from 'react'
import './SokobanMain.sass'
import {Button, Menu, MenuItem} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {GameCore} from '../../GameCore/GameCore'
import {LevelStore} from '../../GameCore/models/LevelStore'
import {themeSelector} from '../../store/selectors'
import {actionCreator} from '../../utils/actionCreator'
import {Actions} from '../../store/actions'
import {useTouches} from '../../hooks/useTouches'

interface NextButtonProps {
    levels: LevelStore[]
    next: () => void
}

const NextButton = memo(({levels, next}: NextButtonProps) => (
    <Button
        className='button_margin'
        variant='contained'
        color='secondary'
        disabled={levels.length < 2}
        onClick={next}>
        Next
    </Button>
))

export const SokobanMain = memo(() => {
    const levelGenerator = new Worker(new URL('../../webWorkers/levelGeneratorWorker', import.meta.url))
    const ref = useRef<HTMLCanvasElement>(null)
    const fullscreenRef = useRef<HTMLDivElement>(null)
    const gameCoreRef = useRef<GameCore>()
    const [levels, setLevels] = useState<LevelStore[]>([])
    const [gameClass, setGameClass] = useState('block')
    const [endClass, setEndClass] = useState('hide')
    const [anchorEl, setAnchorEl] = useState(null)
    useTouches(gameCoreRef)

    const end = () => {
        setGameClass('hide')
        setEndClass('block')
    }

    const game = () => {
        setGameClass('block')
        setEndClass('hide')
    }

    const theme = themeSelector()

    useEffect(() => {
        const canvas = ref.current

        if (canvas === null) {
            throw new Error('canvas is null')
        }

        gameCoreRef.current = new GameCore(canvas)
        const gameCore = gameCoreRef.current
        gameCore.end.subscribe(end)
        const fn = ({key}: KeyboardEvent) => gameCore.move(key)
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
    }, [])

    useEffect(() => {
        if (levels.length > 0) {
            gameCoreRef.current?.redraw(theme)
        }
    }, [theme])

    const restart = useCallback(() => {
        gameCoreRef.current?.drawLevel(levels[0], theme)
    }, [theme])

    const next = useCallback(() => {
        game()

        levels.shift()
        setLevels([...levels])

        levelGenerator.postMessage(true)
        gameCoreRef.current?.drawLevel(levels[0], theme)
    }, [theme])

    const dispatch = useDispatch()

    const handleClick = useCallback((event: any) => {
        setAnchorEl(event.currentTarget)
    }, [])

    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const switchTo = useCallback((action: Actions) => {
        dispatch(actionCreator(action))
        handleClose()
    }, [])

    const fullscreen = useCallback(() => {
        fullscreenRef.current?.requestFullscreen()
    }, [])

    return (
        <div
            className='container_flex'
            ref={fullscreenRef}>
            <div className={gameClass}>
                <div className='row'>
                    <Button
                        className='button_margin'
                        variant='contained'
                        color='primary'
                        disabled={levels.length < 1}
                        onClick={restart}>
                        Restart
                    </Button>
                    <NextButton levels={levels} next={next}/>
                    <Button className='button_margin' onClick={fullscreen}>Full screen</Button>
                    <Button
                        className='button_margin'
                        aria-controls='simple-menu'
                        aria-haspopup='true'
                        onClick={handleClick}>
                        Themes
                    </Button>
                    <Menu
                        id='simple-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <MenuItem onClick={() => switchTo(Actions.STONE_THEME)}>Stone</MenuItem>
                        <MenuItem onClick={() => switchTo(Actions.SAND_THEME)}>Sand</MenuItem>
                        <MenuItem onClick={() => switchTo(Actions.BASIC_THEME)}>Basic</MenuItem>
                    </Menu>
                </div>
                <canvas
                    className='bordered'
                    height='400'
                    width='400'
                    ref={ref}/>
            </div>

            <div className={endClass}>
                <h2>Success!</h2>
                <NextButton levels={levels} next={next}/>
            </div>
        </div>
    )
})
