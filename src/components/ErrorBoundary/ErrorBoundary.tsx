import { Err } from '../../pages/Err/index'
import React, { Component } from 'react'
import { Props, State } from './types'

export class ErrorBoundary extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, errorInfo:'' }
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, errorInfo: error ? error.message : '' }
    }

    render() {

        if (this.state.hasError) {
            return <Err errorInfo={this.state.errorInfo} hideBtn={true}/>
        }

        return this.props.children

    }

}
