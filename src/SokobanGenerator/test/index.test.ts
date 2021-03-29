import {generateSokobanLevel} from "../generateSokobanLevel"

describe("Options", () => {
    test("Sets minWall", () => {
        let options = {
            minWalls: 99,
            attempts: 1000,
        }

        expect(generateSokobanLevel(options)).toBeNull()
    })
})

describe("Sanity check", () => {
    test("1x1", () => {
        expect(generateSokobanLevel({width: 1, height: 1, boxes: 1, minWalls: 0}))
            .toBeNull()
    })

    test("1x2", () => {
        expect(generateSokobanLevel({width: 2, height: 1, boxes: 1, minWalls: 0}))
            .toBeNull()
    })

    test("1x2 too many boxes", () => {
        expect(generateSokobanLevel({width: 2, height: 1, boxes: 5, minWalls: 0}))
            .toBeNull()
    })

    test("1x3", () => {
        expect(generateSokobanLevel({width: 3, height: 2, boxes: 1, minWalls: 0}))
            .not
            .toBeNull()
    })

    test("2x2", () => {
        expect(generateSokobanLevel({width: 2, height: 2, boxes: 1, minWalls: 0}))
            .toBeNull()
    })

    test("2x2 too many boxes", () => {
        expect(generateSokobanLevel({width: 2, height: 2, boxes: 5, minWalls: 0}))
            .toBeNull()
    })
})
