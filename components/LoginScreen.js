import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { setUser } from '../index/action'; // Import action setUser từ Redux


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch(); // Khởi tạo dispatch
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
  if (!username.trim() || !password.trim()) {
    setErrorMessage('Username and password cannot be empty.');
    return;
  }

  setLoading(true);
  setErrorMessage('');

  try {
    // Gửi yêu cầu GET đến API để lấy danh sách người dùng
    console.log('Fetching user data from API...');
    const response = await fetch('https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login');

    if (!response.ok) {
      throw new Error(`Failed to fetch. HTTP status: ${response.status}`);
    }

    const data = await response.json();
    console.log('User data:', data);

    // Kiểm tra username và password
    const user = data.find((u) => u.username === username && u.password === password);

    if (user) {
      // Lưu thông tin người dùng vào Redux
      dispatch(setUser(user)); // Đây là nơi lưu `user` vào Redux.

      // Sau khi đăng nhập, đồng bộ lại giỏ hàng và danh sách yêu thích
      dispatch({ type: 'SET_CART_ITEMS', payload: user.cartItems });
      dispatch({ type: 'SET_FAVORITE_ITEMS', payload: user.favoriteItems });

      setLoading(false);
      setErrorMessage('');
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('All Deals'); // Điều hướng đến trang chính
    } else {
      setLoading(false);
      setErrorMessage('Invalid username or password.');
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    setLoading(false);
    setErrorMessage('Failed to connect to server. Please try again later.');
  }
};



  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Logo />
      <TitleSection />
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      <InputField
        icon="mail-outline"
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        icon="lock-closed-outline"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
      />
      <ForgotPassword />
      {loading ? (
        <ActivityIndicator size="large" color="#00c4ff" />
      ) : (
        <LoginButton onPress={handleLogin} />
      )}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={{ color: '#00aaff', textAlign: 'center', marginVertical: 10, fontSize: 16 }}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
      <SocialLogin />
    </ScrollView>
  );
};

const ErrorMessage = ({ message }) => (
  <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10, fontSize: 15 }}>
    {message}
  </Text>
);

const Logo = () => (
  <Image
    source={require('../assets/icon.png')}
    style={{ width: 80, height: 80, alignSelf: 'center', marginBottom: 40 }}
  />
);

const TitleSection = () => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>Hello Again!</Text>
    <Text style={{ textAlign: 'center', marginVertical: 10, color: '#777', fontSize: 25 }}>
      Log into your account
    </Text>
  </View>
);

const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  togglePasswordVisibility,
  showPassword,
}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginVertical: 10,
    }}
  >
    <Icon name={icon} size={20} color="#ccc" />
    <TextInput
      style={{ flex: 1, marginLeft: 10 }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
    {icon === 'lock-closed-outline' && (
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#ccc" />
      </TouchableOpacity>
    )}
  </View>
);

import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const navigation = useNavigation(); // Sử dụng hook nếu navigation không được truyền trực tiếp

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Pass')}>
      <Text style={{ color: '#00aaff', textAlign: 'right', marginVertical: 10, fontSize: 16 }}>
        Forgot password?
      </Text>
    </TouchableOpacity>
  );
};


const LoginButton = ({ onPress }) => (
  <TouchableOpacity
    style={{
      backgroundColor: '#00c4ff',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    }}
    onPress={onPress}
  >
    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Sign In</Text>
  </TouchableOpacity>
);

const SocialLogin = () => (
  <View style={{ alignItems: 'center', marginTop: 30 }}>
    <Text style={{ color: '#777', marginBottom: 20 }}>or</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '60%' }}>
      <TouchableOpacity>
        <Image source={require('../assets/google.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../assets/face.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../assets/apple.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    </View>
  </View>
);

export default LoginScreen;
