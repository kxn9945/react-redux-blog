import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

//better solution use one func to call neccessary fetch
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  const userIds = _.uniq(_.map(getState().posts, 'userId'));
  userIds.forEach(id => dispatch(fetchUser(id)));

  //use chain to minify the function above^^
  // _.chain(getState().posts)
  // .map('userId')
  // .uniq()
  // .forEach(id => dispatch(fetchUser(id)))
  // value to execute the chain function
  // .value();

  //Promise.all(userIds.forEach(id => dispatch(fetchUser(id)))).then();
}

export const fetchPosts = () => async (dispatch/*, getState*/) => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data });
  }

export const fetchUser = (id) =>  async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({type: 'FETCH_USER', payload: response.data});
};


// export const fetchUser = (id) =>  (dispatch) => {
//   _fetchUser(id, dispatch);
// };
//
// //refactor code to allow lodash memoize function to works
// //so user only fetch unique value
// // problem when we want to refetch
// const _fetchUser = _.memoize(async(id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//
//   dispatch({type: 'FETCH_USER', payload: response.data});
// });
