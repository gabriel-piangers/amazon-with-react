export function getCartQuantity() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function cartQuantityReducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + action.quantity;
    case "decrement":
      return state - action.quantity;
  }
}
export function cartReducer(state, action) {
  let productInCart = false;
  let newCart = [];
  switch (action.type) {
    case "add":
      newCart = state.map((cartItem) => {
        if (cartItem.product.id === action.payload.item.id) {
          productInCart = true;
          return {
            ...cartItem,
            quantity: cartItem.quantity + action.payload.quantity,
          };
        } else {
          return cartItem;
        }
      });
      if (!productInCart) {
        newCart.push({
          product: action.payload.item,
          quantity: action.payload.quantity,
          deliveryOption: {
            id: 1,
            timeToDelivery: 7,
            priceCents: 0,
          },
        });
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;

    case "remove":
      newCart = state.filter((cartItem) => {
        return cartItem.product.id !== action.payload.id;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;

    case "update":
      newCart = state.map((cartItem) => {
        if (cartItem.product.id === action.payload.id) {
          return { ...cartItem, ...action.payload.update };
        } else {
          return cartItem;
        }
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;

    case "clear":
      localStorage.setItem("cart", JSON.stringify([]));
      return [];

    default:
      throw new Error("Unknown Action" + action.type);
  }
}
