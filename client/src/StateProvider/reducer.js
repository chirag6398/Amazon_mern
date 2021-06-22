export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "AddToCart":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "Remove Item From Cart":
      return {
        ...state,
        basket: state.basket.filter((val) => val.id !== action.item.id),
      };
    case "Set_user":
      return {
        ...state,
        user: action.payload.user,
      };
    case "Empty_basket":
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
};
