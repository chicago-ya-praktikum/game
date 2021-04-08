import {RefObject, useEffect} from 'react'
import {GameCore} from '../GameCore/GameCore'
import {deepClone} from '../utils/deepClone'
import {EventKey} from '../GameCore/enums/EventKey'

export const useTouches = (gameCoreRef: RefObject<GameCore | undefined>) => {
    const initialXY = {
        x: 0,
        y: 0
    }

    let start = deepClone(initialXY)
    let end = deepClone(initialXY)

    const touchmove = (event: TouchEvent) => {
        const {screenX, screenY} = event.touches[0]
        end.x = screenX
        end.y = screenY
    }

    const touchstart = (event: TouchEvent) => {
        const {screenX, screenY} = event.touches[0]
        start.x = screenX
        start.y = screenY
    }

    const touchend = () => {
        let key = ''

        const diff = {
            x: start.x - end.x,
            y: start.y - end.y
        }

        const abs = {
            x: Math.abs(diff.x),
            y: Math.abs(diff.y)
        }

        if (abs.x > abs.y) {
            if (diff.x > 0) {
                key = EventKey.Left
            } else {
                key = EventKey.Right
            }
        } else if (diff.y > 0) {
            key = EventKey.Up
        } else {
            key = EventKey.Down
        }

        start = deepClone(initialXY)
        end = deepClone(initialXY)

        gameCoreRef.current?.move(key)
    }

    useEffect(() => {
        window.addEventListener('touchend', touchend)
        window.addEventListener('touchstart', touchstart)
        window.addEventListener('touchmove', touchmove)

        return () => {
            window.removeEventListener('touchend', touchend)
            window.removeEventListener('touchstart', touchstart)
            window.removeEventListener('touchmove', touchmove)
        }
    }, [])
}
