import actionCreatorFactory from 'utils/action-creator-factory';

/********************/
// Action Types

export const SERVER_ERROR = 'SERVER_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

/********************/
// Reducer

export default function error(state = null, action) {
  switch(action.type) {
    case SERVER_ERROR:
      return action.error;
    case CLEAR_ERROR:
      return null;
    default:
      return state;
  };
};

/********************/
// Action Creators

export const serverError = actionCreatorFactory(SERVER_ERROR, 'error');
export const clearError = actionCreatorFactory(CLEAR_ERROR);
