import {
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  ADD_TO_CART_FROM_FAVORITES,
  SET_USER, SET_CART_ITEMS, SET_FAVORITE_ITEMS ,ADD_TRANSACTION
} from './action';

const initialState = {
  user: null, // Lưu thông tin người dùng, bao gồm cả `user.id`
  cartItems: [],
  favoriteItems: [],
  transactions: [], // Thêm lịch sử giao dịch vào state
};

const cartReducer = (state = initialState, action) => {
  const syncCartToAPI = async (userId, cartItems) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });
    } catch (error) {
      console.error('Lỗi khi đồng bộ giỏ hàng với API:', error);
    }
  };

  const syncFavoritesToAPI = async (userId, favoriteItems) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteItems }),
      });
    } catch (error) {
      console.error('Lỗi khi đồng bộ danh sách yêu thích với API:', error);
    }
  };

  switch (action.type) {
     case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
      case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SET_FAVORITE_ITEMS:
      return {
        ...state,
        favoriteItems: action.payload,
      };
    case ADD_TO_CART: {
      const itemInCart = state.cartItems.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );

      const updatedCart = itemInCart
        ? state.cartItems.map((item) =>
            item.id === action.payload.id &&
            item.selectedColor === action.payload.selectedColor &&
            item.selectedSize === action.payload.selectedSize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: 1 }];

      syncCartToAPI(action.userId, updatedCart); // Đồng bộ với API

      return {
        ...state,
        cartItems: updatedCart,
      };
    }

    case INCREASE_QUANTITY: {
  const updatedCart = state.cartItems.map((item) =>
    item.id === action.payload.id && item.selectedColor === action.payload.selectedColor
      ? { ...item, quantity: item.quantity + 1 } // Tăng số lượng
      : item
  );

  return {
    ...state,
    cartItems: updatedCart,
  };
}


case DECREASE_QUANTITY: {
  const updatedCart = state.cartItems.map((item) =>
    item.id === action.payload.id &&
    item.selectedColor === action.payload.selectedColor &&
    item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 } // Giảm số lượng nếu lớn hơn 1
      : item
  );

  return {
    ...state,
    cartItems: updatedCart,
  };
}


    case REMOVE_FROM_CART: {
      const updatedCart = state.cartItems.filter(
        (item) =>
          item.id !== action.payload.productId ||
          item.selectedColor !== action.payload.selectedColor ||
          item.selectedSize !== action.payload.selectedSize
      );

      syncCartToAPI(action.userId, updatedCart); // Đồng bộ với API

      return {
        ...state,
        cartItems: updatedCart,
      };
    }

    case ADD_TO_FAVORITES: {
      const updatedFavorites = [...state.favoriteItems, action.payload];

      syncFavoritesToAPI(action.userId, updatedFavorites); // Đồng bộ với API

      return {
        ...state,
        favoriteItems: updatedFavorites,
      };
    }

    case REMOVE_FROM_FAVORITES: {
      const updatedFavorites = state.favoriteItems.filter(
        (item) => item.id !== action.payload
      );

      syncFavoritesToAPI(action.userId, updatedFavorites); // Đồng bộ với API

      return {
        ...state,
        favoriteItems: updatedFavorites,
      };
    }
    

    case ADD_TO_CART_FROM_FAVORITES: {
      const itemInCart = state.cartItems.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
      

      const updatedCartItems = itemInCart
        ? state.cartItems.map((item) =>
            item.id === action.payload.id &&
            item.selectedColor === action.payload.selectedColor &&
            item.selectedSize === action.payload.selectedSize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: 1 }];

      const updatedFavoriteItems = state.favoriteItems.filter(
        (item) => item.id !== action.payload.id
      );

      syncCartToAPI(action.userId, updatedCartItems); // Đồng bộ với API
      syncFavoritesToAPI(action.userId, updatedFavoriteItems); // Đồng bộ với API

      return {
        ...state,
        cartItems: updatedCartItems,
        favoriteItems: updatedFavoriteItems,
      };
    }
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload], // Thêm giao dịch mới
      };

    default:
      return state;
  }
};

export default cartReducer;
