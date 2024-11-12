import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, FlatList,ImageBackground,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../index/action';
import { useNavigation } from '@react-navigation/native';
import { useSelector} from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../index/action';
const category = [
  { name: 'T-Shirt' },
  { name: 'Jeans' },
  { name: 'Shoes' },
  { name: 'Jacket'},
];

const fashionitem = [
  { 
    id:'17',name: 'Off White T-Shirt', price: 1300, image: require('../assets/tshirt1.png'), category: 'T-Shirt',
    description: [
      "Áo thun phong cách năng động và đơn giản, phù hợp cho phong cách đường phố.",
      "Được làm từ chất liệu cotton 100% mang lại cảm giác thoải mái cho người mặc."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'Streetwear',
    fit: 'Regular Fit',
    material: '100% Cotton'
  },
  { 
    id:'18',name: 'Bubbery T-Shirt', price: 1000, image: require('../assets/tshirt2.png'), category: 'T-Shirt', 
    description: [
      "Thiết kế mang đậm phong cách thời trang thập niên 90, hiện đại nhưng vẫn giữ nét cổ điển.",
      "Chất liệu cotton mềm mại, thoáng khí và thích hợp cho mọi hoạt động hàng ngày."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'Vintage',
    fit: 'Slim Fit',
    material: '95% Cotton, 5% Elastane'
  },
  { 
    id:'19',name: 'Louis Vuton T-Shirt', price: 1500, image: require('../assets/tshirt3.png'), category: 'T-Shirt', 
    description: [
      "Áo thun cao cấp với thiết kế hiện đại, kết hợp phong cách đường phố và thời trang cao cấp.",
      "Chất liệu vải thun cotton co giãn tốt, tạo cảm giác dễ chịu khi vận động."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'High Fashion',
    fit: 'Regular Fit',
    material: '100% Cotton'
  },
  { 
    id:'20',name: 'Off White Jeans', price: 800, image: require('../assets/jean1.png'), category: 'Jeans', 
    description: [
      "Quần jeans phong cách đường phố, phù hợp cho các hoạt động ngoài trời.",
      "Thiết kế form rộng, giúp người mặc cảm thấy thoải mái, không gò bó.",
      "Chất liệu denim bền bỉ, dễ phối đồ."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'Streetwear',
    fit: 'Relaxed Fit',
    material: 'Denim'
  },
  { 
    id:'21',name: 'Bubbery Jeans', price: 700, image: require('../assets/jean2.png'), category: 'Jeans', 
    description: [
      "Phong cách jeans cổ điển pha lẫn chút hiện đại, phù hợp cho các tín đồ thời trang.",
      "Chất liệu denim cao cấp, chắc chắn và bền.",
      "Thiết kế ôm vừa vặn, tôn dáng người mặc."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'Casual',
    fit: 'Slim Fit',
    material: 'Premium Denim'
  },
  { 
    id:'22',name: 'Louis Vutton Jeans', price: 900, image: require('../assets/jean3.png'), category: 'Jeans', 
    description: [
      "Quần jeans cao cấp với phong cách sang trọng, đẳng cấp.",
      "Thiết kế tinh tế, phù hợp cho nhiều hoàn cảnh và dễ dàng phối hợp trang phục."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'High Fashion',
    fit: 'Regular Fit',
    material: '100% Cotton Denim'
  },
  { 
    id:'23',name: 'Off White Shoes', price: 1200, image: require('../assets/shoes1.png'), category: 'Shoes', 
    description: [
      "Giày kết hợp phong cách đường phố, bóng rổ và chạy bộ, lấy cảm hứng từ văn hóa thập niên 90.",
      "Sử dụng ngôn ngữ màu sắc từ các môn thể thao nổi tiếng của Mỹ.",
      "Được làm từ da bê với đế cao su bền chắc."
    ],
    sizes: [38, 40, 42, 44],
    style: 'Streetwear',
    fit: 'Standard Fit',
    material: 'Calf Leather, Rubber Sole'
  },
  { 
    id:'24',name: 'Bubbery Shoes', price: 1100, image: require('../assets/shoes2.png'), category: 'Shoes', 
    description: [
      "Giày thiết kế thanh lịch, phù hợp cho mọi lứa tuổi và phong cách.",
      "Chất liệu da tổng hợp cao cấp và bền bỉ.",
      "Phù hợp cho cả phong cách thường ngày và thể thao."
    ],
    sizes: [38, 40, 42, 44],
    style: 'Casual',
    fit: 'Regular Fit',
    material: 'Synthetic Leather'
  },
  { 
    id:'25',name: 'Louis Vutton Shoes', price: 1600, image: require('../assets/shoes3.png'), category: 'Shoes', 
    description: [
      "Giày thời trang cao cấp, mang lại sự sang trọng và phong cách.",
      "Thiết kế hiện đại, phù hợp cho phong cách đường phố và thể thao."
    ],
    sizes: [38, 40, 42, 44],
    style: 'High Fashion',
    fit: 'Slim Fit',
    material: 'Premium Leather'
  },
  { 
    id:'26',name: 'Off White Jacket', price: 1100, image: require('../assets/jacket1.png'), category: 'Jacket', 
    description: [
      "Áo khoác phong cách đường phố, thích hợp cho thời tiết lạnh.",
      "Chất liệu dày dặn, giúp giữ ấm hiệu quả."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'Streetwear',
    fit: 'Oversized',
    material: 'Polyester, Cotton'
  },
  { 
    id:'27',name: 'Bubbery Jacket', price: 900, image: require('../assets/jacket2.png'), category: 'Jacket', 
    description: [
      "Áo khoác phong cách cổ điển, dễ phối hợp với nhiều trang phục khác nhau.",
      "Thiết kế tinh tế và sang trọng, thích hợp cho cả nam và nữ.",
      "Chất liệu chống thấm nước, phù hợp cho thời tiết mưa."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'Classic',
    fit: 'Regular Fit',
    material: 'Waterproof Polyester'
  },
  { 
    id:'28',name: 'Louis Vutton Jacket', price: 1800, image: require('../assets/jacket3.png'), category: 'Jacket', 
    description: [
      "Áo khoác cao cấp, thiết kế thanh lịch và hiện đại.",
      "Chất liệu nhẹ, giữ ấm tốt mà không tạo cảm giác nặng nề."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'High Fashion',
    fit: 'Slim Fit',
    material: 'Lightweight Nylon'
  },
  { 
    id:'29',name: 'Off Black T-Shirt', price: 800, discountPrice: 500, image: require('../assets/tshirt4.png'), category: 'T-Shirt',
    description: [
      "Áo thun phong cách đường phố, phù hợp cho các bạn trẻ năng động.",
      "Chất liệu cotton thoáng mát và dễ chịu."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'Streetwear',
    fit: 'Relaxed Fit',
    material: '100% Cotton'
  },
  { 
    id:'30',name: 'Levi Jeans', price: 800, discountPrice: 400, image: require('../assets/jean4.png'), category: 'Jeans', 
    description: [
      "Quần jeans cổ điển với thương hiệu Levi nổi tiếng, mang phong cách cổ điển.",
      "Chất liệu denim bền bỉ, thoải mái và dễ kết hợp với các trang phục khác."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'Classic',
    fit: 'Regular Fit',
    material: 'Denim'
  },
  { 
    id:'31',name: 'Strawbbery Shoes', price: 900, discountPrice: 500, image: require('../assets/shoes4.png'), category: 'Shoes', 
    description: [
      "Giày thể thao với thiết kế bắt mắt, phù hợp cho các hoạt động ngoài trời.",
      "Đế cao su chắc chắn, hỗ trợ độ bám tốt trên mọi bề mặt."
    ],
    sizes: [38, 40, 42, 44],
    style: 'Sport',
    fit: 'Standard Fit',
    material: 'Synthetic, Rubber Sole'
  },
  { 
    id:'32',name: 'Luon VuiTuoi Jacket', price: 600, discountPrice: 100, image: require('../assets/jacket4.png'), category: 'Jacket', 
    description: [
      "Áo khoác giữ ấm với phong cách trẻ trung, hiện đại.",
      "Chất liệu nhẹ, thoáng khí, phù hợp cho mọi mùa."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'Casual',
    fit: 'Regular Fit',
    material: 'Breathable Polyester'
  }
];



const SearchBar = ({ searchText, setSearchText }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, height: 45, marginHorizontal: 20, backgroundColor: '#f5f5f5', width: 375, borderColor: '#9095A0',marginLeft:4 }}>
    <TouchableOpacity>
      <Image source={require('../assets/search.png')} style={{ width: 20, height: 20, borderRadius: 50, marginRight: 20 }} />
    </TouchableOpacity>
    <TextInput
      placeholder="Search for products"
      style={{ flex: 1, fontSize: 16 }}
      value={searchText}
      onChangeText={(text) => setSearchText(text)} // Cập nhật từ khóa tìm kiếm khi thay đổi
    />
  </View>
);



const CategoryItem = ({ item, index, onPress, selectedCategory }) => (
  <TouchableOpacity onPress={() => onPress(item.name)} style={{ alignItems: 'center' }}>
    <View style={{
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginVertical: 20,
      marginLeft: 12,
      borderWidth: selectedCategory === item.name ? 2 : 1, // Tăng độ dày viền khi được chọn
      borderRadius: 5,
      width: 80,

      borderColor: selectedCategory === item.name ? '#8A2BE2' : 'black', 
    }}>
     
      <Text style={{ fontSize: 14, color: '#333', fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>{item.name}</Text>
    </View>
  </TouchableOpacity>
);

const Category = ({ onSelectCategory, selectedCategory }) => (
  <FlatList
    horizontal
    data={category}
    renderItem={({ item, index }) => (
      <CategoryItem item={item} index={index} onPress={onSelectCategory} selectedCategory={selectedCategory} />
    )}
    keyExtractor={(item) => item.name}
  />
);

const FashionItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favoriteItems);
  const cartItems = useSelector((state) => state.cartItems);
  const user = useSelector((state) => state.user); // Lấy thông tin user để đồng bộ API
  const isFavorite = favoriteItems.some((favItem) => favItem.id === item.id);

  const [selectedColor, setSelectedColor] = useState(
    item.colors && item.colors.length > 0 ? item.colors[0] : null
  );

  const syncCartToAPI = async (updatedCart) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: updatedCart }),
      });
    } catch (error) {
      console.error('Lỗi khi đồng bộ giỏ hàng với API:', error);
    }
  };

  const syncFavoritesToAPI = async (updatedFavorites) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteItems: updatedFavorites }),
      });
    } catch (error) {
      console.error('Lỗi khi đồng bộ danh sách yêu thích với API:', error);
    }
  };

   const toggleFavorite = async () => {
  const productWithCorrectPrice = {
    ...item,
    price: item.discountPrice || item.price, // Sử dụng giá giảm nếu có
  };

  const updatedFavorites = isFavorite
    ? favoriteItems.filter((favItem) => favItem.id !== item.id)
    : [...favoriteItems, productWithCorrectPrice];

  dispatch(isFavorite ? removeFromFavorites(item.id) : addToFavorites(productWithCorrectPrice));
  await syncFavoritesToAPI(updatedFavorites);
};

  const handleAddToCart = async () => {
  // Xác định size mặc định dựa trên category (quần áo hoặc giày)
  let defaultSize = null;

  if (item.category === 'T-Shirt'||item.category === 'Jeans'||item.category === 'Jacket') {
    defaultSize = 'S'; // Mặc định size là 'S' cho quần áo
  } else if (item.category === 'Shoes') {
    defaultSize = '40'; // Mặc định size là '40' cho giày
  }

  const productWithSelection = {
    ...item,
    selectedColor: selectedColor ? selectedColor.colorName : null,
    image: selectedColor ? selectedColor.image : item.image,
    selectedSize: defaultSize, // Thêm size mặc định vào sản phẩm
    quantity: 1, // Đảm bảo khởi tạo `quantity` là 1
    price: item.discountPrice || item.price
  };

  // Kiểm tra nếu sản phẩm với màu và size cụ thể đã tồn tại
  const existingItem = cartItems.find(
    (cartItem) =>
      cartItem.id === productWithSelection.id &&
      cartItem.selectedColor === productWithSelection.selectedColor &&
      cartItem.selectedSize === productWithSelection.selectedSize // Kiểm tra cả size
  );

  // Nếu sản phẩm đã tồn tại, tăng số lượng; nếu không, thêm sản phẩm mới
  const updatedCart = existingItem
    ? cartItems.map((cartItem) =>
        cartItem.id === productWithSelection.id &&
        cartItem.selectedColor === productWithSelection.selectedColor &&
        cartItem.selectedSize === productWithSelection.selectedSize
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // Tăng số lượng
          : cartItem
      )
    : [...cartItems, productWithSelection]; // Thêm sản phẩm mới

  try {
    dispatch(addToCart(productWithSelection)); // Cập nhật Redux
    await syncCartToAPI(updatedCart); // Đồng bộ giỏ hàng với API

    Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng', [{ text: 'OK' }]);
  } catch (error) {
    console.error('Lỗi khi đồng bộ giỏ hàng với API:', error);
    Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
  }
};



  const handlePress = () => {
    navigation.navigate('FashionDetail', { product: item });
  };

  return(
  <TouchableOpacity onPress={handlePress}style={{ width:170, margin: 10, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}>
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Image source={item.image} style={{ height: 120, width: 120, borderRadius: 10 }} />
        <TouchableOpacity onPress={toggleFavorite} style={{ position: 'absolute', top: 5, right: -1 }}>
          <Icon name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "red" : "#888"} />
        </TouchableOpacity>

        <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>{item.name}</Text>

        {/* Kiểm tra nếu có giá giảm, hiển thị giá gốc với gạch ngang và giá giảm */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 5 }}>
          {item.discountPrice ? (
            <>
              <Text style={{ color: '#888', fontSize: 16, textDecorationLine: 'line-through' }}>${item.price}</Text>
              <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>${item.discountPrice}</Text>
            </>
          ) : (
            <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>${item.price}</Text>
          )}
          <TouchableOpacity onPress={handleAddToCart} style={{ backgroundColor: '#e0e0e0', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginLeft: 10 }}>
            <Icon name="add" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}


const EList = ({ filteredItems }) => (
  <FlatList
    data={filteredItems}
    renderItem={({ item }) => <FashionItem item={item} />}
    keyExtractor={(item) => item.name}
    numColumns={2} // Hiển thị 2 cột cho giao diện giống hình mẫu
    contentContainerStyle={{ paddingBottom: 80 }} // Tạo không gian để Footer không che khuất
  />
);
const DiscountItem = ({ item }) => { 

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favoriteItems);
  const cartItems = useSelector((state) => state.cartItems);
  const user = useSelector((state) => state.user); // Lấy thông tin user để đồng bộ API
  const isFavorite = favoriteItems.some((favItem) => favItem.id === item.id);

  const [selectedColor, setSelectedColor] = useState(
    item.colors && item.colors.length > 0 ? item.colors[0] : null
  );

  const syncCartToAPI = async (updatedCart) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: updatedCart }),
      });
    } catch (error) {
      console.error('Lỗi khi đồng bộ giỏ hàng với API:', error);
    }
  };

  const syncFavoritesToAPI = async (updatedFavorites) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteItems: updatedFavorites }),
      });
    } catch (error) {
      console.error('Lỗi khi đồng bộ danh sách yêu thích với API:', error);
    }
  };

  const toggleFavorite = async () => {
  const productWithCorrectPrice = {
    ...item,
    price: item.discountPrice || item.price, // Sử dụng giá giảm nếu có
  };

  const updatedFavorites = isFavorite
    ? favoriteItems.filter((favItem) => favItem.id !== item.id)
    : [...favoriteItems, productWithCorrectPrice];

  dispatch(isFavorite ? removeFromFavorites(item.id) : addToFavorites(productWithCorrectPrice));
  await syncFavoritesToAPI(updatedFavorites);
};


  const handleAddToCart = async () => {
  // Xác định size mặc định dựa trên category (quần áo hoặc giày)
  let defaultSize = null;

  if (item.category === 'T-Shirt'||item.category === 'Jeans'||item.category === 'Jacket') {
    defaultSize = 'S'; // Mặc định size là 'S' cho quần áo
  } else if (item.category === 'Shoes') {
    defaultSize = '40'; // Mặc định size là '40' cho giày
  }

  const productWithSelection = {
    ...item,
    selectedColor: selectedColor ? selectedColor.colorName : null,
    image: selectedColor ? selectedColor.image : item.image,
    selectedSize: defaultSize, // Thêm size mặc định vào sản phẩm
    quantity: 1, // Đảm bảo khởi tạo `quantity` là 1
    price: item.discountPrice || item.price
  };

  // Kiểm tra nếu sản phẩm với màu và size cụ thể đã tồn tại
  const existingItem = cartItems.find(
    (cartItem) =>
      cartItem.id === productWithSelection.id &&
      cartItem.selectedColor === productWithSelection.selectedColor &&
      cartItem.selectedSize === productWithSelection.selectedSize // Kiểm tra cả size
  );

  // Nếu sản phẩm đã tồn tại, tăng số lượng; nếu không, thêm sản phẩm mới
  const updatedCart = existingItem
    ? cartItems.map((cartItem) =>
        cartItem.id === productWithSelection.id &&
        cartItem.selectedColor === productWithSelection.selectedColor &&
        cartItem.selectedSize === productWithSelection.selectedSize
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // Tăng số lượng
          : cartItem
      )
    : [...cartItems, productWithSelection]; // Thêm sản phẩm mới

  try {
    dispatch(addToCart(productWithSelection)); // Cập nhật Redux
    await syncCartToAPI(updatedCart); // Đồng bộ giỏ hàng với API

    Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng', [{ text: 'OK' }]);
  } catch (error) {
    console.error('Lỗi khi đồng bộ giỏ hàng với API:', error);
    Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
  }
};

  const handlePress = () => {
    navigation.navigate('FashionDetail', { product: item });
  };


  return(
    <TouchableOpacity onPress={handlePress} style={{ width:170, margin: 10, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}>
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Image source={item.image} style={{ height: 120, width: 120, borderRadius: 10 }} />
        <TouchableOpacity onPress={toggleFavorite} style={{ position: 'absolute', top: 5, right: -1 }}>
          <Icon name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "red" : "#888"} />
        </TouchableOpacity>

        <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>{item.name}</Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          {item.discountPrice ? (
            <>
              <Text style={{ color: '#888', fontSize: 16, textDecorationLine: 'line-through', marginRight: 5 }}>${item.price}</Text>
              <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>${item.discountPrice}</Text>
            </>
          ) : (
            <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>${item.price}</Text>
          )}
        

        <TouchableOpacity onPress={handleAddToCart} style={{ backgroundColor: '#e0e0e0', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginTop: 5, marginLeft: 10 }}>
          <Icon name="add" size={25} color="black" />
        </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const DiscountList = ({ items }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => <DiscountItem item={item} />}
    keyExtractor={(item) => item.name}
    numColumns={2} // Hiển thị 2 cột cho giao diện giống hình mẫu
    contentContainerStyle={{ paddingBottom: 20 }}
    showsHorizontalScrollIndicator={false}
  />
);

const Footer = () => {
   const navigation = useNavigation();


   const cartItems = useSelector((state) => state.cartItems);
   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

   const favoriteItems = useSelector((state) => state.favoriteItems);
   const favoriteCount = favoriteItems.length;

      // Lấy thông tin user từ Redux
  const user = useSelector((state) => state.user);

  if (!user) {
    console.warn("User data not found in Redux.");
  }

   return (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: 400 , position: 'absolute',bottom: 0,backgroundColor:'#ff6363'}}>
    <TouchableOpacity onPress={() => navigation.navigate('All Deals')}>
      <View style={{ alignItems: 'center', marginRight: 20 }}>
        <Image source={require('../assets/clarity_home-solid.png')} style={{ width: 30, height: 30 }} />
        <Text style={{ fontSize: 16 }}>Home</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <View style={{ alignItems: 'center', marginRight: 20 }}>
          <Image source={require('../assets/cart.png')} style={{ width: 33, height: 33 }} />
          {cartCount > 0 && (
            <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5 }}>
              <Text style={{ color: 'white', fontSize: 14 }}>{cartCount}</Text>
            </View>
          )}
          <Text style={{ fontSize: 16 }}>Cart</Text>
        </View>
      </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('FavoriteScreen')}>
      <View style={{ alignItems: 'center', marginRight: 20 }}>
        <Image source={require('../assets/mdi_heart-outline.png')} style={{ width: 33, height: 33 }} />

        {favoriteCount > 0 && (
            <View style={{ position: 'absolute', top: -5, right: 3, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5 }}>
              <Text style={{ color: 'white', fontSize: 14 }}>{favoriteCount}</Text>
            </View>
          )}
        
        <Text style={{ fontSize: 16 }}>Favorite</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
      <View style={{ alignItems: 'center', marginRight: 20 }}>
        <Image source={require('../assets/solar_inbox-outline.png')} style={{ width: 30, height: 30 }} />
        <Text style={{ fontSize: 16 }}>Inbox</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId: user?.id })}>
      <View style={{ alignItems: 'center', marginRight: 20 }}>
        <Image source={require('../assets/codicon_account.png')} style={{ width: 30, height: 30 }} />
        <Text style={{ fontSize: 16 }}>Account</Text>
      </View>
    </TouchableOpacity>
  </View>
);
};
const Banner = () => (
  <ImageBackground source={require('../assets/bannerfashion.png')} style={{ height: 150, marginHorizontal: 20, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', padding: 20 ,width:375,marginLeft:1,marginTop:2}}>
  <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' ,marginLeft:135,marginBottom:10}}>MEN'S CASUALS</Text>
  <Text style={{ color: 'black', fontSize: 17 ,marginLeft:132}}>Guide to Gentleman's Style</Text>
  
  </ImageBackground>
);

const Fashion = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Lọc sản phẩm dựa trên danh mục đã chọn và từ khóa tìm kiếm
  const filteredItems = fashionitem.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Nếu không có danh mục được chọn và không có tìm kiếm, giới hạn sản phẩm hiển thị
  const displayedItems = selectedCategory || searchText ? filteredItems : filteredItems.slice(1, 5);

  // Các sản phẩm có discount
  const discountItems = fashionitem.filter(item => item.discountPrice);

  // Xử lý chọn hoặc hủy chọn danh mục
  const handleCategorySelect = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // Hủy chọn nếu nhấn lại vào danh mục đã chọn
    } else {
      setSelectedCategory(categoryName);
    }
  };

  return (
    <View style={{ width:'100vh',height:'92vh' }}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Banner />
        <Category onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />

        {/* Hiển thị "Best Sells" và "Discount" chỉ khi không có danh mục và tìm kiếm */}
        {!selectedCategory && !searchText && (
          <>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Best Sells</Text>
            <EList filteredItems={displayedItems} />
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', marginTop: -80 }}>Discount</Text>
            <DiscountList items={discountItems} />
          </>
        )}

        {/* Hiển thị các sản phẩm được lọc */}
        {selectedCategory || searchText ? (
          <EList filteredItems={filteredItems} />
        ) : null}
      </ScrollView>
      <Footer />
    </View>
  );
};


export default Fashion;

