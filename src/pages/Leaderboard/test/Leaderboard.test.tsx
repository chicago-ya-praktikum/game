import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Leaderboard } from '../index'

Enzyme.configure({ adapter: new Adapter() })

describe('Leaderboard: wrapper',()=> {
  
    test('default render', () => {
        
        const wrapper = mount(
            <Leaderboard />
        )
 
        expect(wrapper.find('h5').text()).toEqual('Leaderboard')
        expect(wrapper.find('th')).toHaveLength(2)
        expect(wrapper.find('td')).toHaveLength(10)
    
    })

})