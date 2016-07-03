/*************************/
// ActionTypes

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

/*************************/
// Reducer

export default function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

/*************************/
// Actions

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}
