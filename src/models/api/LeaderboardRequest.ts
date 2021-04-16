import {ratingFieldName} from '../../contstants/apiYandex/ratingFieldName'

export class LeaderboardRequest {
    ratingFieldName: string
    cursor: number
    limit: number

    constructor() {
        this.ratingFieldName = ratingFieldName
        this.cursor = 0
        this.limit = 10
    }
}
