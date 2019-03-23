import {SET_LOGGED, LOGIN} from './types'

export function login (dispatch) {
    return function( payload) {
        dispatch({
            type: LOGIN,
            payload: payload
        })
    }
    // console.log('action')
    // (payload) => ({
    //     dispatch({
    //         type: SET_LOGGED,
    //         payload: payload
    //     })
    // }
}

// export const fetchPosts = () => dispatch => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then(res => res.json())
//       .then(posts =>
//         dispatch({
//           type: FETCH_POSTS,
//           payload: posts
//         })
//       );
//   };