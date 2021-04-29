import 'colors'

export const fillInByDefault = (db: any) => {
    db.reactions.bulkCreate([
        {iconName: 'ThumbUpIcon'},
        {iconName: 'ThumbDownIcon'},
        {iconName: 'ThumbsUpDownIcon'},
        {iconName: 'SentimentSatisfiedAltIcon'},
        {iconName: 'SentimentVeryDissatisfiedIcon'}
    ]).then(() => {
        // eslint-disable-next-line no-console
        console.log('Filling in reactions is finished OK'.green)
    })
}
