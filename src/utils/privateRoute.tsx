import React from 'react'
import {SignInPage} from '../pages/SignIn/SignIn'

export function privateRoute(WrappedComponent: React.ComponentType) {
    class PrivateComponent extends React.Component {
        private isUser = false;

        constructor(props: {} | Readonly<{}>) {
            super(props);
        }

        render() {
            return this.isUser ? <WrappedComponent/> : <SignInPage/>
        }
    }
    return PrivateComponent;
}
