import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, FlatList,ImageBackground,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../index/action';
import { useSelector} from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../index/action';
const category = [
  { name: 'Fitness' },
  { name: 'Cycling' },
  { name: 'Boxing' },
  { name: 'Golf'},
];

const sportsitem = [
  { 
    id:'49',name: 'TreadMill', 
    price: 400, 
    image: require('../assets/fitness1.png'), 
    category: 'Fitness', 
    description: [
      "Máy chạy bộ đa chức năng với màn hình hiển thị tốc độ, quãng đường và calo.",
      "Thiết kế nhỏ gọn, dễ sử dụng tại nhà."
    ],
    brand: 'NordicTrack',
    durability: '5 năm'
  },
  { 
    id:'50',name: 'Dumbbells', 
    price: 200, 
    image: require('../assets/fitness2.png'), 
    category: 'Fitness', 
    description: [
      "Tạ tay đa năng giúp tăng cường cơ bắp và cải thiện sức mạnh.",
      "Thiết kế bền bỉ và có thể điều chỉnh trọng lượng."
    ],
    brand: 'Bowflex',
    durability: '10 năm'
  },
  { 
    id:'51',name: 'Abdominal Bench', 
    price: 300, 
    image: require('../assets/fitness3.png'), 
    category: 'Fitness', 
    description: [
      "Ghế tập bụng hỗ trợ các bài tập bụng, cải thiện cơ bụng hiệu quả.",
      "Thiết kế chắc chắn, có thể điều chỉnh độ dốc."
    ],
    brand: 'ProForm',
    durability: '5 năm'
  },
  { 
    id:'52',name: 'Triban RC 500', 
    price: 800, 
    image: require('../assets/cycling1.png'), 
    category: 'Cycling', 
    description: [
      "Xe đạp Triban RC 500 với khung nhôm nhẹ, phù hợp cho các chuyến đi dài.",
      "Trang bị bộ truyền động Shimano, dễ dàng thay đổi tốc độ."
    ],
    brand: 'Decathlon',
    durability: '3 năm'
  },
  { 
    id:'53',name: 'Road R500 Helmet', 
    price: 700, 
    image: require('../assets/cycling2.png'), 
    category: 'Cycling', 
    description: [
      "Mũ bảo hiểm xe đạp Road R500 với thiết kế bảo vệ toàn diện.",
      "Thoáng khí và có thể điều chỉnh kích cỡ dễ dàng."
    ],
    brand: 'Giro',
    durability: '2 năm'
  },
  { 
    id:'54',name: 'Polyester Gear', 
    price: 400, 
    image: require('../assets/cycling3.png'), 
    category: 'Cycling', 
    description: [
      "Bộ đồ đạp xe với chất liệu polyester thoáng mát, chống thấm mồ hôi.",
      "Thiết kế gọn gàng, tạo cảm giác thoải mái khi đạp xe đường dài."
    ],
    brand: 'Pearl Izumi',
    durability: '3 năm'
  },
  { 
    id:'55',name: 'Boxing Gloves', 
    price: 200, 
    image: require('../assets/boxing1.png'), 
    category: 'Boxing', 
    description: [
      "Găng tay boxing chuyên dụng giúp bảo vệ tay và cổ tay khi tập luyện.",
      "Thiết kế vừa vặn, tạo cảm giác thoải mái."
    ],
    brand: 'Everlast',
    durability: '3 năm'
  },
  { 
    id:'56',name: 'Boxing Trunk', 
    price: 100, 
    image: require('../assets/boxing2.png'), 
    category: 'Boxing', 
    description: [
      "Quần boxing thoáng mát, linh hoạt cho mọi chuyển động.",
      "Thiết kế đẹp mắt, phù hợp cho các buổi tập luyện và thi đấu."
    ],
    brand: 'Title Boxing',
    durability: '2 năm'
  },
  { 
    id:'57',name: 'Boxing HeadGear', 
    price: 60, 
    image: require('../assets/boxing3.png'), 
    category: 'Boxing', 
    description: [
      "Nón bảo hộ boxing giúp bảo vệ đầu khỏi các chấn động.",
      "Thoáng khí và điều chỉnh dễ dàng."
    ],
    brand: 'Ringside',
    durability: '2 năm'
  },
  { 
    id:'58',name: 'Hybrid Golf', 
    price: 800, 
    image: require('../assets/golf1.png'), 
    category: 'Golf', 
    description: [
      "Gậy golf Hybrid cho khoảng cách xa và kiểm soát tốt hơn.",
      "Phù hợp cho cả người chơi nghiệp dư và chuyên nghiệp."
    ],
    brand: 'Callaway',
    durability: '5 năm'
  },
  { 
    id:'59',name: 'Stand Golf Bag', 
    price: 600, 
    image: require('../assets/golf2.png'), 
    category: 'Golf', 
    description: [
      "Túi golf Stand với thiết kế tiện lợi, có chân chống.",
      "Không gian rộng rãi, dễ dàng chứa nhiều gậy golf và phụ kiện."
    ],
    brand: 'TaylorMade',
    durability: '3 năm'
  },
  { 
    id:'60',name: 'Bullet Golf Ball', 
    price: 500, 
    image: require('../assets/golf3.png'), 
    category: 'Golf', 
    description: [
      "Bóng golf Bullet với thiết kế aerodynamics cho khoảng cách xa.",
      "Bền và chịu lực tốt khi sử dụng."
    ],
    brand: 'Titleist',
    durability: '1 năm'
  },
  { 
    id:'61',name: 'Yoga Mat', 
    price: 250,  
    discountPrice: 150, 
    image: require('../assets/fitness4.png'), 
    category: 'Fitness', 
    description: [
      "Thảm yoga chống trơn, dễ lau chùi, lý tưởng cho mọi cấp độ tập luyện.",
      "Độ dày vừa phải, mang lại sự thoải mái và an toàn khi tập."
    ],
    brand: 'Manduka',
    durability: '2 năm'
  },
  { 
    id:'62',name: 'Cycling Bottle', 
    price: 200,  
    discountPrice: 120, 
    image: require('../assets/cycling4.png'), 
    category: 'Cycling', 
    description: [
      "Bình nước dành riêng cho đạp xe, dễ dàng lấy và gắn vào xe.",
      "Thiết kế giữ nhiệt, giữ nước lạnh trong thời gian dài."
    ],
    brand: 'CamelBak',
    durability: '1 năm'
  },
  { 
    id:'63',name: 'MMA Gloves', 
    price: 300,  
    discountPrice: 100, 
    image: require('../assets/boxing4.png'), 
    category: 'Boxing', 
    description: [
      "Găng tay MMA linh hoạt, bảo vệ tối đa cho tay và cổ tay.",
      "Thoáng khí và không gây kích ứng cho da."
    ],
    brand: 'Venum',
    durability: '3 năm'
  },
  { 
    id:'64',name: 'Golf Cart', 
    price: 4500,  
    discountPrice: 2000, 
    image: require('../assets/golf4.png'), 
    category: 'Golf', 
    description: [
      "Xe đẩy golf tiện lợi, có khả năng chứa đầy đủ dụng cụ và phụ kiện.",
      "Dễ điều khiển, bánh xe lớn giúp di chuyển dễ dàng trên mọi địa hình."
    ],
    brand: 'Clicgear',
    durability: '5 năm'
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

const SportsItem = ({ item }) => {
 
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
    navigation.navigate('SportingDetail', { product: item });
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
    renderItem={({ item }) => <SportsItem item={item} />}
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
    navigation.navigate('SportingDetail', { product: item });
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
  <ImageBackground source={require('../assets/sportbanner.png')} style={{ height: 150, marginHorizontal: 20, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', padding: 20 ,width:375,marginLeft:1,marginTop:2}}>
  <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold',marginLeft:20,marginTop:40 }}>Elevate Your Performance</Text>
  <Text style={{ color: 'black', fontSize: 17,marginLeft:24  }}>Top Quality Equipment for Every Sport</Text>
  
  </ImageBackground>
);

const Sporting = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Lọc sản phẩm dựa trên danh mục đã chọn và từ khóa tìm kiếm
  const filteredItems = sportsitem.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Nếu không có danh mục được chọn và không có tìm kiếm, giới hạn sản phẩm hiển thị
  const displayedItems = selectedCategory || searchText ? filteredItems : filteredItems.slice(1, 5);

  // Các sản phẩm có discount
  const discountItems = sportsitem.filter(item => item.discountPrice);

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


export default Sporting;

