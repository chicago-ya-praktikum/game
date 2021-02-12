import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { ErrorBoundary } from './ErrorBoundary'

Enzyme.configure({ adapter: new Adapter() })

const ComponentWithError = (): JSX.Element => {
    throw new Error('TestError')
    return <div />  
}

describe('ErrorBoundary: wrapper',()=> {
  
    test('Test error', () => {
        const wrapper = mount(
            <ErrorBoundary > 
                <ComponentWithError />
            </ErrorBoundary> 
      )
      expect(wrapper.find('h3').text()).toEqual('TestError')
  })

})