


function createThunkMiddleware(
  extraArgument
) {
 const middleware = ({ dispatch, getState}) => 
    next => 
    action => {
      if(typeof action === 'function') {
        return action(dispatch, getState, extraArgument)
      }

      return next(action)
    }

    return middleware
}



const thunk = createThunkMiddleware()

export default thunk