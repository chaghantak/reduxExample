//액션 타입

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

//액션 생성 함수

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

//getState를 쓰지 않는다면 굳이 파라미터로 받아올 필요 x
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(increase()), 1000);
};

export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(decrease()), 1000);
};

//초기값
const initialState = {
  number: 0,
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
}
