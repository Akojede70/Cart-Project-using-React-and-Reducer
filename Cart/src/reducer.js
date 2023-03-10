const reducer = (state, action) => {
  // state the current state before the update
  // Action is what we are trying to do
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
    // cart is to clear the array and is a property
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      // the cart is an array
      // check the context file for all the payload
    };
  }
  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
        // the spread operator allow us to copy part of an existing array into another array or object
        // amount is = 1
        // cartItem.amount + 1 will increase
      }
      return cartItem;
      // return the cartItem that has been defined
    });
    return { ...state, cart: tempCart };
    // return the formal state and cart array is now temptCart
  }
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    // cartItem not equal to 0, once it is equal to 0 it will be removed
    return { ...state, cart: tempCart };
    // return the formal state and cart array is now temptCart
  }
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      // This code uses destructuring syntax to extract the total and amount variables from the result of calling the reduce() method on the state.cart array.
      // The reduce() method is used to iterate over the items in the state.cart array and accumulate a total and amount value for all the items.
      // The method takes a callback function and an initial value as its arguments.
      // the
      (cartTotal, cartItem) => {
        // The callback function takes two parameters: cartTotal and cartItem. cartTotal is the accumulated total value and cartItem is the current item being iterated over.
        // By destructuring the result of the reduce() method, we can directly assign the total and amount variables to their respective values in the returned object.
        const { price, amount } = cartItem;
        // price and amount is in the array, cartItem are the increase and the decrease
        const itemTotal = price * amount;
        // price X the amount, amount is the number

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
        // Setting the initial value of both properties to zero is a common practice when working with numerical values, as it provides a clear starting point and prevents unexpected behavior that can arise from uninitialized variables.
      }
    );
    total = parseFloat(total.toFixed(2));
    // the two figure at the back of the dot in the total
    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
    // loading was set to false after it has load.
  }
  if (action.type === "TOGGLE_AMOUNT") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  throw new Error("no matching action type");
};

export default reducer;
