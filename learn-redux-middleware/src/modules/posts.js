import * as postsAPI from "../api/posts";
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
} from "../lib/asyncUtils";

//액션 타입

//포스트 여러개 조회하기
const GET_POSTS = "GET_POSTS"; //요청 시작
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS"; //요청 성공
const GET_POSTS_ERROR = "GET_POSTS_ERROR"; //요청 실패

//포스트 하나 조회하기
const GET_POST = "GET_POST"; //요청 시작
const GET_POST_SUCCESS = "GET_POST_SUCCESS"; //요청 성공
const GET_POST_ERROR = "GET_POST_ERROR"; //요청 실패

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.

// export const getPosts = () => async (dispatch) => {
//   dispatch({ type: GET_POSTS }); //요청 시작
//   try {
//     const posts = await postsAPI.getPosts(); //API호출
//     dispatch({ type: GET_POSTS_SUCCESS, posts }); //성공
//   } catch (e) {
//     dispatch({ type: GET_POSTS_ERROR, error: e });
//   }
// };
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts); //lib에서 async함수작업을 해줘서 코드 리팩토링
// export const getPost = (id) => async (dispatch) => {
//   dispatch({ type: GET_POST }); //요청 시작
//   try {
//     const post = await postsAPI.getPostById(id); // API호출
//     dispatch({ type: GET_POST_SUCCESS, post });
//   } catch (e) {
//     dispatch({ type: GET_POST_ERROR, error: e });
//   }
// };
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
//초기값 선언
// const initialState = {
//   posts: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//   post: {
//     loading: false,
//     data: null,
//     error: null,
//   },
// };
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, "posts")(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActions(GET_POST, "post")(state, action);
    default:
      return state;
  }
}
// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case GET_POSTS:
//       return {
//         ...state,
//         // posts: {
//         //   loading: true,
//         //   data: null,
//         //   error: null,
//         // },
//         posts: reducerUtils.loading(),
//       };
//     case GET_POSTS_SUCCESS:
//       return {
//         ...state,
//         // posts: {
//         //   loading: false,
//         //   data: action.posts,
//         //   error: null,
//         // },
//         posts: reducerUtils.success(action.payload),
//       };
//     case GET_POSTS_ERROR:
//       return {
//         ...state,
//         // posts: {
//         //   loading: false,
//         //   data: null,
//         //   error: action.error,
//         // },
//         posts: reducerUtils.error(action.payload),
//       };
//     case GET_POST:
//       return {
//         ...state,
//         post: reducerUtils.loading(),
//       };
//     case GET_POST_SUCCESS:
//       return {
//         ...state,
//         post: reducerUtils.success(action.payload), // action.post -> action.payload 로 변경됐습니다.
//       };
//     case GET_POST_ERROR:
//       return {
//         ...state,
//         post: reducerUtils.error(action.error),
//       };
//     default:
//       return state;
//   }
// }
