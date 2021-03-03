import React from 'react'
import {mount} from 'enzyme'
import {Profile} from './index'

describe('Profile: wrapper', () => {
    test('main test', () => {
        const wrapper = mount(
            <Profile/>
        )

        expect(wrapper.find('.MuiAvatar-root')).toHaveLength(1)
        expect(wrapper.find('button#upload-a-photo')).toHaveLength(1)
        expect(wrapper.find('input[type="file"]')).toHaveLength(1)
        expect(wrapper.find('input#nickname')).toHaveLength(1)
        expect(wrapper.find('div#gender-select')).toHaveLength(1)
        expect(wrapper.find('input#age')).toHaveLength(1)

        expect(wrapper.find('button#change-password_show')).toHaveLength(1)
    })
})
