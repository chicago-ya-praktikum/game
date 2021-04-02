import {imagesPrefix} from '../../constants/imagesPrefix'
import {ImageContent} from '../../enums/ImageContent'

interface InitializedImage {
    [_: string]: HTMLImageElement
}

export class ImageStore {
    images: InitializedImage

    constructor() {
        this.images = Object.values(ImageContent).reduce((accumulator, current) => {
            const image = new Image()
            image.src = `${imagesPrefix}${current}.png`

            return Object.assign(accumulator, {[current]: image})
        }, {})
    }
}
