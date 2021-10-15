export const initialState = {
  products: [],
  basket: [],
  user: null,
  orders: [],
  address: undefined,
};

export const reducer = (state, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case "InitialBasket":
      return {
        ...state,
        basket: action.payload,
      };
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
    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
    case "UPDATE_ADDRESS":
      return{
        ...state,
        address:action.payload
      }
    default:
      return state;
  }
};
