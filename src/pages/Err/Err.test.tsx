import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Err } from './Err'

Enzyme.configure({ adapter: new Adapter() })

describe('Err: wrapper',()=> {
  
    test('All props', () => {
        
        const wrapper = mount(
            <Err error='TestTite' errorInfo='TestInfo' hideBtn={true} />
        )
    
        expect(wrapper.find('h1').text()).toEqual('TestTite')
        expect(wrapper.find('h3').text()).toEqual('TestInfo')
        expect(wrapper.find('button')).toHaveLength(0)

    })

    test('Without props', () => {
        
        const wrapper = mount(
            <Err />
        )
    
        expect(wrapper.find('h1').text()).toEqual('Sorry')
        expect(wrapper.find('h3').text()).toEqual('Something went wrong')
        expect(wrapper.find('button')).toHaveLength(1)

    })


})