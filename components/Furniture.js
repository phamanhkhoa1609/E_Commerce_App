import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, FlatList,ImageBackground,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../index/action';
import { useSelector} from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../index/action';
const category = [
  { name: 'Chairs' },
  { name: 'Desk' },
  { name: 'Sofa' },
  { name: 'Wardrobes'},
];

const furnitureitem = [
  { 
    id:'33',name: 'Wooden Ancient', price: 300, 
    image: require('../assets/chair1.png'), 
    category: 'Chairs',
    description: [
      "Ghế gỗ cổ điển mang lại vẻ đẹp truyền thống, thích hợp cho không gian phòng khách hoặc phòng làm việc.",
      "Chất liệu gỗ tự nhiên bền chắc, đem đến cảm giác thoải mái khi ngồi."
    ],
    dimensions: "80cm x 50cm x 90cm",
    origin: "Vietnam",
    style: "Cổ điển",
    warranty: "2 năm"
  },
  { 
    id:'34',name: 'Wingback Reading', 
    price: 200, 
    image: require('../assets/chair2.png'), 
    category: 'Chairs',
    description: [
      "Ghế Wingback lý tưởng cho việc đọc sách với phần lưng cao và tựa tay thoải mái.",
      "Thiết kế trang nhã phù hợp cho không gian hiện đại hoặc cổ điển."
    ],
    dimensions: "85cm x 55cm x 100cm",
    origin: "France",
    style: "Hiện đại",
    warranty: "1 năm"
  },
  { 
    id:'35',name: 'French Antique', 
    price: 100, 
    image: require('../assets/chair3.png'), 
    category: 'Chairs',
    description: [
      "Ghế cổ điển kiểu Pháp, mang phong cách lãng mạn và thanh lịch.",
      "Phù hợp với những không gian mang hơi hướng châu Âu."
    ],
    dimensions: "75cm x 45cm x 85cm",
    origin: "France",
    style: "Cổ điển Pháp",
    warranty: "1 năm"
  },
  { 
    id:'36',name: 'Ytaoka Desk', 
    price: 200, 
    image: require('../assets/desk1.png'), 
    category: 'Desk',
    description: [
      "Bàn làm việc Ytaoka đơn giản và tiện dụng, phù hợp cho không gian nhỏ gọn.",
      "Mặt bàn rộng rãi, giúp tối ưu hóa không gian làm việc."
    ],
    dimensions: "120cm x 60cm x 75cm",
    origin: "Japan",
    style: "Tối giản",
    warranty: "1 năm"
  },
  { 
    id:'37',name: 'Computer Desk', 
    price: 150, 
    image: require('../assets/desk2.png'), 
    category: 'Desk',
    description: [
      "Bàn vi tính thiết kế hiện đại, với không gian dành riêng cho máy tính và phụ kiện.",
      "Chất liệu bền đẹp, dễ lau chùi và bảo quản."
    ],
    dimensions: "110cm x 50cm x 75cm",
    origin: "China",
    style: "Hiện đại",
    warranty: "6 tháng"
  },
  { 
    id:'38',name: 'Classic Desk', 
    price: 600, 
    image: require('../assets/desk3.png'), 
    category: 'Desk',
    description: [
      "Bàn làm việc cổ điển với thiết kế tinh tế và sang trọng.",
      "Thích hợp cho không gian làm việc đẳng cấp và chuyên nghiệp."
    ],
    dimensions: "130cm x 70cm x 80cm",
    origin: "Italy",
    style: "Cổ điển",
    warranty: "2 năm"
  },
  { 
    id:'39',name: 'Luxury Sofa', 
    price: 1200, 
    image: require('../assets/sofa1.png'), 
    category: 'Sofa',
    description: [
      "Sofa cao cấp mang lại vẻ đẹp sang trọng và hiện đại cho phòng khách.",
      "Đệm êm ái, tạo sự thoải mái tối đa khi sử dụng."
    ],
    dimensions: "210cm x 90cm x 85cm",
    origin: "USA",
    style: "Hiện đại",
    warranty: "3 năm"
  },
  { 
    id:'40',name: 'Classic Sofa', 
    price: 1100, 
    image: require('../assets/sofa2.png'), 
    category: 'Sofa',
    description: [
      "Sofa cổ điển với kiểu dáng thanh lịch, phù hợp với không gian cổ điển.",
      "Thiết kế sang trọng và chất liệu cao cấp đảm bảo độ bền lâu dài."
    ],
    dimensions: "200cm x 85cm x 80cm",
    origin: "Italy",
    style: "Cổ điển",
    warranty: "3 năm"
  },
  { 
    id:'41',name: 'Elegant Sofa', 
    price: 1600, 
    image: require('../assets/sofa3.png'), 
    category: 'Sofa',
    description: [
      "Sofa thanh lịch với phong cách hiện đại, tôn lên vẻ đẹp phòng khách của bạn.",
      "Đệm êm ái và kiểu dáng sang trọng, tạo điểm nhấn cho không gian sống."
    ],
    dimensions: "220cm x 90cm x 85cm",
    origin: "Turkey",
    style: "Hiện đại",
    warranty: "2 năm"
  },
  { 
    id:'42',name: 'Luxury Wardrobe', 
    price: 1600, 
    image: require('../assets/wardrobe1.png'), 
    category: 'Wardrobes',
    description: [
      "Tủ quần áo cao cấp với thiết kế sang trọng, mang đến không gian lưu trữ rộng rãi.",
      "Chất liệu gỗ bền chắc và thiết kế tinh tế, phù hợp với phòng ngủ đẳng cấp."
    ],
    dimensions: "200cm x 80cm x 220cm",
    origin: "Germany",
    style: "Sang trọng",
    warranty: "3 năm"
  },
  { 
    id:'43',name: 'Classic Wardrobe', 
    price: 1900, 
    image: require('../assets/wardrobe2.png'), 
    category: 'Wardrobes',
    description: [
      "Tủ quần áo cổ điển với đường nét tinh xảo, tạo điểm nhấn cho phòng ngủ.",
      "Dung lượng chứa lớn, đáp ứng nhu cầu lưu trữ quần áo, phụ kiện."
    ],
    dimensions: "180cm x 75cm x 210cm",
    origin: "France",
    style: "Cổ điển",
    warranty: "2 năm"
  },
  { 
    id:'44',name: 'Elegant Wardrobe', 
    price: 1800, 
    image: require('../assets/wardrobe3.png'), 
    category: 'Wardrobes',
    description: [
      "Tủ quần áo thanh lịch với phong cách hiện đại, phù hợp cho phòng ngủ tiện nghi.",
      "Thiết kế thông minh, giúp bạn sắp xếp và tổ chức không gian một cách hiệu quả."
    ],
    dimensions: "190cm x 85cm x 215cm",
    origin: "Sweden",
    style: "Hiện đại",
    warranty: "3 năm"
  },
  { 
    id:'45',name: 'Wooden Barrel', 
    price: 800,  
    discountPrice: 500,
    image: require('../assets/chair4.png'), 
    category: 'Chairs',
    description: [
      "Ghế dạng thùng gỗ độc đáo, mang lại vẻ đẹp mộc mạc và cổ điển.",
      "Phù hợp với không gian ngoài trời hoặc phong cách trang trí vintage."
    ],
    dimensions: "70cm x 50cm x 80cm",
    origin: "Vietnam",
    style: "Vintage",
    warranty: "1 năm"
  },
  { 
    id:'46',name: 'Gaming Desk', 
    price: 800,  
    discountPrice: 400, 
    image: require('../assets/desk4.png'), 
    category: 'Desk',
    description: [
      "Bàn chơi game chuyên dụng với thiết kế hiện đại và nhiều ngăn để đồ.",
      "Mặt bàn rộng rãi, phù hợp cho các thiết bị chơi game và phụ kiện."
    ],
    dimensions: "140cm x 70cm x 75cm",
    origin: "China",
    style: "Hiện đại",
    warranty: "1 năm"
  },
  { 
    id:'47',name: 'Okyanus Sofa', 
    price: 900,  
    discountPrice: 500, 
    image: require('../assets/sofa4.png'), 
    category: 'Sofa',
    description: [
      "Sofa Okyanus với thiết kế đơn giản và hiện đại, dễ dàng phối hợp với nhiều không gian.",
      "Chất liệu cao cấp, mang lại cảm giác thoải mái khi ngồi."
    ],
    dimensions: "210cm x 90cm x 85cm",
    origin: "Turkey",
    style: "Hiện đại",
    warranty: "2 năm"
  },
  { 
    id:'48',name: 'Okyka Wardrobe', 
    price: 1600,  
    discountPrice: 1100, 
    image: require('../assets/wardrobe4.png'), 
    category: 'Wardrobes',
    description: [
      "Tủ quần áo Okyka thiết kế thông minh, phù hợp với không gian hiện đại.",
      "Không gian lưu trữ rộng rãi, tiện ích cho việc sắp xếp đồ đạc."
    ],
    dimensions: "200cm x 80cm x 220cm",
    origin: "Turkey",
    style: "Hiện đại",
    warranty: "3 năm"
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
      marginLeft: 5,
      borderWidth: selectedCategory === item.name ? 2 : 1, // Tăng độ dày viền khi được chọn
      borderRadius: 5,
      width: 95,

      borderColor: selectedCategory === item.name ? '#8A2BE2' : 'black', 
    }}>
     
      <Text style={{ fontSize: 13, color: '#333', fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>{item.name}</Text>
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

const FurnitureItem = ({ item }) => {

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
    const productWithSelection = {
      ...item,
      selectedColor: selectedColor ? selectedColor.colorName : null,
      image: selectedColor ? selectedColor.image : item.image,
      quantity: 1, // Đảm bảo khởi tạo `quantity` là 1
      price: item.discountPrice || item.price
    };

    // Kiểm tra nếu sản phẩm với màu cụ thể đã tồn tại
  const existingItem = cartItems.find(
    (cartItem) =>
      cartItem.id === productWithSelection.id &&
      cartItem.selectedColor === productWithSelection.selectedColor
  );

  // Nếu sản phẩm đã tồn tại, tăng số lượng; nếu không, thêm sản phẩm mới
  const updatedCart = existingItem
    ? cartItems.map((cartItem) =>
        cartItem.id === productWithSelection.id &&
        cartItem.selectedColor === productWithSelection.selectedColor
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // Tăng số lượng
          : cartItem
      )
    : [...cartItems, productWithSelection]; // Thêm sản phẩm mới

    dispatch(addToCart(productWithSelection));
    await syncCartToAPI(updatedCart);

    Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng', [{ text: 'OK' }]);
  };

  const handlePress = () => {
    navigation.navigate('FurnitureDetail', { product: item });
  };

  return(
  <TouchableOpacity onPress={handlePress} style={{ width:170, margin: 10, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}>
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
          <TouchableOpacity  onPress={handleAddToCart} style={{ backgroundColor: '#e0e0e0', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginLeft: 10 }}>
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
    renderItem={({ item }) => <FurnitureItem item={item} />}
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
    const productWithSelection = {
      ...item,
      selectedColor: selectedColor ? selectedColor.colorName : null,
      image: selectedColor ? selectedColor.image : item.image,
      quantity: 1, // Đảm bảo khởi tạo `quantity` là 1
      price: item.discountPrice || item.price, // Sử dụng giá giảm nếu có, ngược lại dùng giá gốc
    };

    // Kiểm tra nếu sản phẩm với màu cụ thể đã tồn tại
  const existingItem = cartItems.find(
    (cartItem) =>
      cartItem.id === productWithSelection.id &&
      cartItem.selectedColor === productWithSelection.selectedColor
  );

  // Nếu sản phẩm đã tồn tại, tăng số lượng; nếu không, thêm sản phẩm mới
  const updatedCart = existingItem
    ? cartItems.map((cartItem) =>
        cartItem.id === productWithSelection.id &&
        cartItem.selectedColor === productWithSelection.selectedColor
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // Tăng số lượng
          : cartItem
      )
    : [...cartItems, productWithSelection]; // Thêm sản phẩm mới

    dispatch(addToCart(productWithSelection));
    await syncCartToAPI(updatedCart);

    Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng', [{ text: 'OK' }]);
  };

  const handlePress = () => {
    navigation.navigate('FurnitureDetail', { product: item });
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
  <ImageBackground source={require('../assets/bannerfurniture.png')} style={{ height: 150, marginHorizontal: 20, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', padding: 20 ,width:375,marginLeft:1,marginTop:2}}>
  <Text style={{ color: 'white', fontSize: 22 ,marginLeft:130,marginBottom:10}}>Modern Elegance</Text>
  <Text style={{ color: 'white', fontSize: 17 ,marginLeft:120}}>Elevate Your Living Space</Text>
  
  </ImageBackground>
);

const Furniture = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Lọc sản phẩm dựa trên danh mục đã chọn và từ khóa tìm kiếm
  const filteredItems = furnitureitem.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Nếu không có danh mục được chọn và không có tìm kiếm, giới hạn sản phẩm hiển thị
  const displayedItems = selectedCategory || searchText ? filteredItems : filteredItems.slice(1, 5);

  // Các sản phẩm có discount
  const discountItems = furnitureitem.filter(item => item.discountPrice);

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


export default Furniture;

