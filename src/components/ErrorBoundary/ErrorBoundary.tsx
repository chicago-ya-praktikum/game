import { Err } from '../../pages/Err/Err'
import React, { Component } from 'react'

type Props = {
}

type State = {
  hasError: boolean,
  errorInfo?: string
}

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