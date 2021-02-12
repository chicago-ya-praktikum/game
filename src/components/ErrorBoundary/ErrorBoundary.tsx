import React, { Component } from 'react'

type Props = {
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: any) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return { hasError: true }
    }

    componentDidCatch(error:any, errorInfo: any) {
        // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    }

    render() {
        if (this.state.hasError) {
            // Можно отрендерить запасной UI произвольного вида
            return <h1>Что-то пошло не так.</h1>
        }

        return this.props.children
    
    }

}