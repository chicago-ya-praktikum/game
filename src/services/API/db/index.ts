import {postLogIn} from './user'
import {
    postCreateTopic, putUpdateTopic, getTopics, getOneTopic, deleteTopic
} from './topic'
import {postCreateComment, getComments} from './comment'
import {getAllReactions} from './reaction'
import {postUserReactions, getTopicReactions} from './userReaction'

export {
    postLogIn,
    postCreateTopic, putUpdateTopic, getTopics, getOneTopic, deleteTopic,
    postCreateComment, getComments,
    getAllReactions,
    postUserReactions, getTopicReactions
}
