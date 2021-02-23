import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {SignInPage} from '../pages/SignIn/SignIn'

type StateProps = {
    user: any
};
type Props = StateProps;

export function privateRoute(this: any, WrappedComponent: React.ComponentType) {
    class PrivateComponent extends PureComponent<Props> {
        render() {
            const {user} = this.props
            return user.user ? <WrappedComponent/> : <SignInPage/>
        }
    }
    const mapStateToProps = (state: { user: any; }): StateProps => ({
        user: state.user
    });
    return connect(mapStateToProps)(PrivateComponent)
}
