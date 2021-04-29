import {postLogIn} from './user'
import {
    postCreateTopic, putUpdateTopic, getTopics, getOneTopic, deleteTopic
} from './topic'
import {postCreateComment, getComments} from './comment'
import {getAllReactions} from './reaction'

export {
    postLogIn,
    postCreateTopic, putUpdateTopic, getTopics, getOneTopic, deleteTopic,
    postCreateComment, getComments,
    getAllReactions
}
