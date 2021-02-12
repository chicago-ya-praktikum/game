import { MemoryRouter } from 'react-router-dom'
import React from 'react'
// import * as MR from './MainRouter'  
import { MainRouter, pageHome, pageForum, pageLeaderboard, pageGame, pageProfile } from './MainRouter'
import Enzyme, { mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

const MR = jest.mock('./MainRouter')

//MR.spyOn
console.log(MR)
//pageProfile = 

//MR.pageHome.mockImplementation

//let mok = jest.fn()

const MainRouterOriginal = jest.requireActual('./MainRouter')


// jest.mock('./MainRouter', () => {
//     return jest.fn().mockImplementation(() => {
//       return {
//             pageHome: () => <h1>/leaderboard</h1>
//         }
//     })
//   })

const mockPlaySoundFile = jest.fn();
jest.mock('./MainRouter', () => {
  return jest.fn().mockImplementation(() => {
    return {pageHome: mockPlaySoundFile};
  });
})


//mok.mockClear()

// jest.mock('./MainRouter', () => {
//     return () => {
//         return {
//             pageHome        : jest.fn()
//             // pageLeaderboard : () => <h1>/leaderboard</h1>,
//         }
//     }
//   })

Enzyme.configure({ adapter: new Adapter() })

describe('MainRouter: wrapper', () => {

    console.log(pageHome)

    const getWrapper = (route: string) => {
        return mount(
            <MemoryRouter initialEntries={ [route]} >
                <MainRouterOriginal.MainRouter />
            </MemoryRouter>
        )
    }
    
    test('should render the home page', () => {
        console.log(getWrapper('/').debug())
        expect(getWrapper('/').find('h1').text()).toEqual('/home')
    })

    // test('should render the leaderboard page', () => {
    //     expect(getWrapper('/leaderboard').find('h1').text()).toEqual('/leaderboard')
    // })

    // test('should render the forum page', () => {
    //     expect(getWrapper('/forum').find('h1').text()).toEqual('/forum')
    // })

    // test('should render the game page', () => {
    //     expect(getWrapper('/game').find('h1').text()).toEqual('/game')
    // })

    // test('should render the profile page', () => {
    //     expect(getWrapper('/profile').find('h1').text()).toEqual('/profile')
    // })

    // test('should render the signup page', () => {
    //     expect(getWrapper('/signup').find('h1').text()).toEqual('/signup')
    // })

    // test('should render the signin page', () => {
    //     expect(getWrapper('/signin').find('h1').text()).toEqual('/signin')
    // })

    // test('should render the error page', () => {
    //     expect(getWrapper('/random').find('h1').text()).toEqual('error')
    // })

})
