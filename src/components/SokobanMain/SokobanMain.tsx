import React, {PureComponent} from 'react'
import './SokobanMain.sass'
import {GameCore} from '../../utils/GameCore'
import {exampleLevel} from '../../constants/exampleLevel'

export class SokobanMain extends PureComponent {
    ref = React.createRef<HTMLCanvasElement>()

    componentDidMount() {
        const canvas = this.ref.current

        if (canvas === null) {
            throw new Error('canvas is null')
        }

        const gameCore = new GameCore(canvas).drawLevel(exampleLevel)

        window.addEventListener('keydown', (event) => gameCore.move(event))
    }

    render() {
        return (
            <canvas
                height="400"
                width="400"
                ref={this.ref}
            />
        )
    }
}
