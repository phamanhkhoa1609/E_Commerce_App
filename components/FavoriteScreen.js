import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites, addToCartFromFavorites, setCartItems, setFavoriteItems } from '../index/action';
import Icon from 'react-native-vector-icons/Ionicons';

const FavoriteScreen = ({ navigation }) => {
  const favoriteItems = useSelector((state) => state.favoriteItems);
  const cartItems = useSelector((state) => state.cartItems);
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux
  const dispatch = useDispatch();

  // Đồng bộ yêu thích với API
  const syncFavoritesToAPI = async (updatedFavorites) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteItems: updatedFavorites }),
      });
    } catch (error) {
      console.error('Lỗi đồng bộ danh sách yêu thích:', error);
      Alert.alert('Error', 'Không thể đồng bộ danh sách yêu thích. Vui lòng thử lại.');
    }
  };

  // Đồng bộ cả Cart và Favorite với API
  const syncCartAndFavoritesToAPI = async (updatedCart, updatedFavorites) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: updatedCart,
          favoriteItems: updatedFavorites,
        }),
      });
    } catch (error) {
      console.error('Lỗi khi đồng bộ Cart và Favorite:', error);
      Alert.alert('Error', 'Không thể đồng bộ dữ liệu. Vui lòng thử lại.');
    }
  };

  // Xóa sản phẩm khỏi danh sách yêu thích
  const handleRemoveFavorite = async (productId) => {
    const updatedFavorites = favoriteItems.filter((item) => item.id !== productId);
    dispatch(removeFromFavorites(productId));
    await syncFavoritesToAPI(updatedFavorites); // Đồng bộ với API
  };

  // Thêm sản phẩm từ yêu thích vào giỏ hàng
  const handleAddToCart = async (item) => {
    try {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
      const existingItem = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      let updatedCartItems;
      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        updatedCartItems = cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới với số lượng là 1
        updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
      }

      // Cập nhật Redux
      dispatch(setCartItems(updatedCartItems)); // Cập nhật danh sách giỏ hàng
      dispatch(removeFromFavorites(item.id)); // Xóa khỏi danh sách yêu thích

      // Đồng bộ API
      const updatedFavorites = favoriteItems.filter((favItem) => favItem.id !== item.id);
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: updatedCartItems,
          favoriteItems: updatedFavorites,
        }),
      });

      Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng.', [{ text: 'OK' }]);
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
      Alert.alert('Error', 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
    }
  };

  // Tải dữ liệu từ API khi người dùng đăng nhập
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from server');
        }
        const data = await response.json();
        dispatch(setCartItems(data.cartItems || [])); // Đồng bộ giỏ hàng
        dispatch(setFavoriteItems(data.favoriteItems || [])); // Đồng bộ danh sách yêu thích
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu từ API:', error);
      }
    };

    if (user && user.id) {
      fetchData();
    }
  }, [user, dispatch]);

  // Hàm điều hướng đến màn hình chi tiết sản phẩm
 const screenMapping = {
  'Sofa': 'FurnitureDetail',
  'Desk': 'FurnitureDetail',
  'Wardrobes': 'FurnitureDetail',
  'Chairs': 'FurnitureDetail',

  'SmartPhone': 'ElectronicDetail',
  'Tablet': 'ElectronicDetail',
  'Laptop': 'ElectronicDetail',
  'Accessories':'ElectronicDetail',

  'Cycling': 'SportingDetail',
  'Boxing': 'SportingDetail',
  'Fitness': 'SportingDetail',
  'Golf': 'SportingDetail',
  
  'T-Shirt': 'FashionDetail',
  'Jeans': 'FashionDetail',
  'Shoes': 'FashionDetail',
  'Jacket': 'FashionDetail',
};

const handleItemPress = (item) => {
  // Lấy tên màn hình từ screenMapping dựa vào category của sản phẩm
  const screenName = screenMapping[item.category];

  if (screenName) {
    // Điều hướng đến màn hình tương ứng với category của sản phẩm
    navigation.navigate(screenName, { product: item });
  } else {
    // Nếu không tìm thấy màn hình tương ứng, có thể hiển thị một thông báo lỗi hoặc chuyển đến màn hình mặc định
    console.error('Không tìm thấy màn hình cho loại sản phẩm này');
  }
};

  // Render sản phẩm yêu thích
  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
      onPress={() => handleItemPress(item)} // Thêm sự kiện khi bấm vào sản phẩm
    >
      {/* Hiển thị ảnh sản phẩm */}
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
        <Text style={{ fontSize: 16, color: 'green' }}>${item.price}</Text>
      </View>

      {/* Xóa khỏi danh sách yêu thích */}
      <TouchableOpacity onPress={() => handleRemoveFavorite(item.id)}>
        <Icon name="remove-circle-sharp" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={{ width: '52vh', height: '90vh', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 }}>
        Favorites
      </Text>
      <FlatList
        data={favoriteItems}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No favorites yet!</Text>}
      />
    </View>
  );
};

export default FavoriteScreen;
