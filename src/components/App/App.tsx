import React from 'react'
import {SignUpPage} from '../../pages/SignUp/SignUp'
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary'

export function App() {
    return (
        <ErrorBoundary>
          <div className="workspace__wrapper">
              <h1>SOKOBAN</h1>
              <SignUpPage/>
          </div>
        </ErrorBoundary>
    )
}
