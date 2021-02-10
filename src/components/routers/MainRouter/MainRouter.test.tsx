import { MemoryRouter, Route } from 'react-router-dom'
import React, { ReactElement } from 'react'
import { MainRouter } from './MainRouter'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new Adapter() })

describe.skip('MainRouter: snapshot', () => {
    
    const component = mount(<MainRouter />)
    expect(component).toMatchSnapshot()

})



describe.skip('MainRouter: wrapper', () => {
    
    const getWrapper = (route: string): ReactElement => {
        return <MemoryRouter initialEntries={[route]}>
                    <MainRouter />
                </MemoryRouter>
    }
    
    test('should render the home page', () => {
        const page = <h1>/home</h1>
        expect(mount(getWrapper('/')).contains(page)).toEqual(true)
    })

    // Всегда рендерит /. Не понятно.
    test('should render the leaderboard page', () => {
        const page = <h1>/leaderboard</h1>
        // Ошибка 
        expect(mount(getWrapper('/leaderboard')).contains(page)).toEqual(true)
        // Нет ошибки
        expect(mount(getWrapper('/leaderboard')).contains(<h1>/home</h1>)).toEqual(true)
        
        //expect(mount(getWrapper('/leaderboard'))).toMatchSnapshot()
    })

})

let pathMap: any = {}
describe.skip('MainRouter: array of routes', () => {
    
    beforeAll(() => {
        
        const component = shallow(<MainRouter/>);
        pathMap = component.find(Route).reduce((pathMap, currRoute) => {
            const routeProps: any = currRoute.props()
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, pathMap)
        
    })

    test('should render the home page', () => {
        const page = function() { return <h1>/home</h1> } 
        expect((pathMap['/'])).toBe(page)
    })
    
})
