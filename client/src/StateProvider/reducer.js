export const initialState = {
  products: [],
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
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
    case "Set_products":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
