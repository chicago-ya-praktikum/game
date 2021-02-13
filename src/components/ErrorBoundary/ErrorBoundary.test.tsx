import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { ErrorBoundary } from './ErrorBoundary'

Enzyme.configure({ adapter: new Adapter() })

const TastComponent = (): JSX.Element => {
    return <div>TastComponent</div>  
}

describe('ErrorBoundary: wrapper',()=> {
  
    test('Test error', () => {
        const wrapper = mount(
            <ErrorBoundary > 
                <TastComponent />
            </ErrorBoundary> 
        )
      
    const error = new Error('test')
    wrapper.find(TastComponent).simulateError(error)
      
  })

})