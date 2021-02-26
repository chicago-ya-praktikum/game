import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {LayOutTSX} from '../components/LayOut/LayOut'

type StateProps = {
    user: any
};
type Props = StateProps;

export function authView(this: any, WrappedComponent: React.ComponentType) {
    class LoggedInComponent extends PureComponent<Props> {
        render() {
            const {user} = this.props
            return !user.user ? <WrappedComponent/> : <LayOutTSX/>
        }
    }
    const mapStateToProps = (state: { user: any; }): StateProps => ({
        user: state.user
    });
    return connect(mapStateToProps)(LoggedInComponent)
}
