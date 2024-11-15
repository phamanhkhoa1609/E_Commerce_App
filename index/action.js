
export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const ADD_TO_CART_FROM_FAVORITES = 'ADD_TO_CART_FROM_FAVORITES';


export const addToCart = (product, selectedColor = null, selectedSize = null) => ({
  type: ADD_TO_CART,
  payload: {
    ...product,
    selectedColor: selectedColor || product.selectedColor || null, // Lưu màu đã chọn
    selectedSize: selectedSize || product.selectedSize || null, // Lưu size đã chọn
    price: product.discountPrice || product.price,
  },
});


export const increaseQuantity = (id, selectedColor) => ({
  type: INCREASE_QUANTITY,
  payload: { id, selectedColor }, // Đảm bảo gửi cả `id` và `selectedColor`
});

export const decreaseQuantity = (id, selectedColor) => ({
  type: DECREASE_QUANTITY,
  payload: { id, selectedColor }, // Đảm bảo gửi cả `id` và `selectedColor`
});


export const removeFromCart = (productId, selectedColor, selectedSize) => ({
  type: REMOVE_FROM_CART,
  payload: { productId, selectedColor, selectedSize },
});



export const addToFavorites = (product) => ({
  type: ADD_TO_FAVORITES,
  payload: product,
});

export const removeFromFavorites = (productId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: productId,
});



export const addToCartFromFavorites = (product) => ({
  type: ADD_TO_CART_FROM_FAVORITES,
  payload: product,
});
export const syncCartToAPI = (userId, cartItems) => async () => {
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

export const syncFavoritesToAPI = (userId, favoriteItems) => async () => {
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

export const SET_USER = 'SET_USER';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const SET_FAVORITE_ITEMS = 'SET_FAVORITE_ITEMS';


export const setCartItems = (cartItems) => ({
  type: SET_CART_ITEMS,
  payload: cartItems,
});

export const setFavoriteItems = (favoriteItems) => ({
  type: SET_FAVORITE_ITEMS,
  payload: favoriteItems,
});

export const ADD_TRANSACTION = "ADD_TRANSACTION";

export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  payload: transaction,
});









