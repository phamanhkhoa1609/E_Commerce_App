import React, { useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';

import { addToCart, setCartItems } from '../index/action'; // Import action cần thiết
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon FontAwesome
import Review from './Review';

const ElectronicDetail = ({ route,navigation }) => {
  const { product } = route.params;
  const initialColor = product.colors && product.colors.length > 0 ? product.colors[0] : null;
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [localCartItems, setLocalCartItems] = useState([]); // Lưu trữ giỏ hàng để phản hồi nhanh hơn
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng
  const cartItems = useSelector((state) => state.cartItems); // Lấy danh sách giỏ hàng hiện tại

  // Cập nhật giỏ hàng cục bộ khi Redux thay đổi
  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const handleAddToCart = async () => {
    if (!user || !user.id) {
      Alert.alert('Error', 'Không thể thêm sản phẩm vì thông tin người dùng không hợp lệ.');
      return;
    }

    const productWithSelection = {
      ...product,
      selectedColor: selectedColor ? selectedColor.colorName : null,
      image: selectedColor ? selectedColor.image : product.image,
      quantity: 1, // Đặt mặc định số lượng là 1
    };

    const existingItem = localCartItems.find(
      (item) =>
        item.id === productWithSelection.id &&
        item.selectedColor === productWithSelection.selectedColor
    );

    const updatedCart = existingItem
      ? localCartItems.map((item) =>
          item.id === productWithSelection.id &&
          item.selectedColor === productWithSelection.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...localCartItems, productWithSelection];

    try {
      const response = await fetch(
        `https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartItems: updatedCart }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to sync cart items with server.');
      }

      const updatedUserData = await response.json();
      dispatch(setCartItems(updatedUserData.cartItems || []));
      setLocalCartItems(updatedUserData.cartItems || []); // Cập nhật giỏ hàng cục bộ
      Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng', [{ text: 'OK' }]);
    } catch (error) {
      console.error('Lỗi khi đồng bộ giỏ hàng:', error.message);
      Alert.alert('Error', 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
    }
  }
  const handleBuyNow = async () => {
  if (!user || !user.id) {
    Alert.alert('Error', 'Không thể mua sản phẩm vì thông tin người dùng không hợp lệ.');
    return;
  }

  const productWithSelection = {
    ...product,
    selectedColor: selectedColor ? selectedColor.colorName : null,
    image: selectedColor ? selectedColor.image : product.image,
    quantity: 1, // Mặc định số lượng là 1
    price: product.discountPrice || product.price, // Ưu tiên giá giảm nếu có
  };

  const existingItem = localCartItems.find(
    (item) =>
      item.id === productWithSelection.id &&
      item.selectedColor === productWithSelection.selectedColor
  );

  const updatedCart = existingItem
    ? localCartItems.map((item) =>
        item.id === productWithSelection.id &&
        item.selectedColor === productWithSelection.selectedColor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    : [...localCartItems, productWithSelection];

  try {
    const response = await fetch(
      `https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: updatedCart }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to sync cart items with server.');
    }

    const updatedUserData = await response.json();
    dispatch(setCartItems(updatedUserData.cartItems || []));
    setLocalCartItems(updatedUserData.cartItems || []); // Cập nhật giỏ hàng cục bộ

    // Điều hướng đến màn hình thanh toán
    navigation.navigate('Payment', {
      total: parseFloat(product.discountPrice || product.price) + 10, // Tổng giá sản phẩm + phí ship
    });
  } catch (error) {
    console.error('Lỗi khi đồng bộ giỏ hàng:', error.message);
    Alert.alert('Error', 'Không thể mua sản phẩm. Vui lòng thử lại.');
  }
};





  return (
    <View style={{width:'56vh',height:'90vh'}}>
    <ScrollView style={{  backgroundColor: '#fff', padding: 20}}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image source={selectedColor ? selectedColor.image : product.image} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' }}>{product.name}</Text>
        {product.discountPrice ? (
          <View style={{  alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: '#888', textDecorationLine: 'line-through', marginRight: 10 }}>Giá gốc:${product.price}</Text>
            <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}>Giá bán: ${product.discountPrice}</Text>
          </View>
        ) : (
          <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}>Giá bán: ${product.price}</Text>
        )}
      </View>

      {product.colors && product.colors.length > 0 && (
        <>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>Chọn màu sắc:</Text>
          <FlatList
            horizontal
            data={product.colors}
            keyExtractor={(item) => item.colorName}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedColor(item)} style={{ margin: 5, borderRadius: 8, borderWidth: 1, width: 50, height: 30, marginLeft: 4 }}>
                <Text style={{
                  fontSize: 15,
                  fontWeight: selectedColor && selectedColor.colorName === item.colorName ? 'bold' : 'normal',
                  color: selectedColor && selectedColor.colorName === item.colorName ? 'red' : '#333',
                  marginLeft: 8
                }}>
                  {item.colorName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>Mô Tả:</Text>
      {product.description.map((feature, index) => (
        <Text key={index} style={{ fontSize: 16, marginBottom: 5 }}>• {feature}</Text>
      ))}


      
       {/* Phần đánh giá */}
        <Review
          navigation={navigation}
          reviewsCount={40} // Số lượng bình luận giả
          rating={4.2} // Điểm đánh giá trung bình (giả lập)
        />

      
    </ScrollView>
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
  {/* Nút Chat */}
  <TouchableOpacity
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#18fe07',
      padding: 10,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
     
    }}
   
  >
    <Icon name="comment" size={20} color="#fff" />
  </TouchableOpacity>

  {/* Nút Thêm vào giỏ hàng */}
  <TouchableOpacity
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00C4CC',
    }}
    onPress={handleAddToCart}
  >
    <Icon name="shopping-cart" size={20} color="#fff" />
  </TouchableOpacity>

  {/* Nút Mua */}
  <TouchableOpacity
    style={{
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF5722',
      padding: 10,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      
    }}
    onPress={handleBuyNow}
   
  >
    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
      Mua
    </Text>
  </TouchableOpacity>
</View>

    </View>
  );
};

export default ElectronicDetail;
