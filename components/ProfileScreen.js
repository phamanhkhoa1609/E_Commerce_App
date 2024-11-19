import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator,ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAvatarUri, setNewAvatarUri] = useState(""); // Lưu URI mới từ người dùng
   const navigation = useNavigation();

  const API_URL = `https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${userId}`;

  // Hàm fetch dữ liệu người dùng
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      Alert.alert("Lỗi", "Không thể tải thông tin người dùng.");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Hàm lưu URI mới vào avatar
  const updateAvatarUri = () => {
    if (!newAvatarUri.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập một đường dẫn ảnh hợp lệ.");
      return;
    }

    setUser({ ...user, avatar: newAvatarUri }); // Cập nhật avatar tạm thời
    setNewAvatarUri(""); // Xóa ô nhập sau khi cập nhật
  };

  // Hàm lưu dữ liệu sau khi chỉnh sửa
  const saveProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        Alert.alert("Thành công", "Thông tin đã được cập nhật!");
        setIsEditing(false); // Thoát chế độ chỉnh sửa
      } else {
        throw new Error(`HTTP status ${response.status}`);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00BFFF" />
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return (
  <View style={{ width:'52vh',height:'90vh', backgroundColor: "#f9f9f9" }}>
    {/* Avatar và Tên */}
    <View style={{ alignItems: "center", marginVertical: 20 }}>
      <Image
        source={{ uri: user.avatar }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "#00BFFF",
        }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
        {user.firstName} {user.lastName}
      </Text>
      <Text style={{ color: "#666" }}>Gold Member</Text>
    </View>
     {/* Lịch sử giao dịch */}
     {!isEditing && (
    <View
      style={{
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginHorizontal: 10,
        elevation: 3,
        marginBottom: 20,
        paddingVertical: 10,
      }}
    >
      <TouchableOpacity
  style={{
    flexDirection: "row", // Hiển thị nội dung nằm ngang
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#f9f9f9", // Màu nền trắng nhạt
    borderWidth: 1,
    borderColor: "#ccc", // Viền nhạt
    marginVertical: 10, // Khoảng cách bên trên và dưới
  }}
   onPress={() => navigation.navigate("Giao Dich")} // Nút này có thể điều hướng sang màn hình khác
>
  {/* Biểu tượng bên trái */}
  <View
    style={{
      marginRight: 10, // Khoảng cách giữa biểu tượng và chữ
      backgroundColor: "#e6e6e6", // Màu nền xám nhạt cho biểu tượng
      padding: 5,
      borderRadius: 50, // Làm tròn biểu tượng
    }}
  >
    <Image
      source={{ uri: "https://img.icons8.com/?size=100&id=24333&format=png" }} // URL hoặc thay bằng biểu tượng local
      style={{
        width: 20,
        height: 20,
        tintColor: "#007BFF", // Màu của biểu tượng
      }}
    />
  </View>

  {/* Chữ bên phải */}
  <Text style={{ fontSize: 16, color: "#333" }}>Lịch sử giao dịch</Text>
</TouchableOpacity>

<TouchableOpacity
  style={{
    flexDirection: "row", // Hiển thị nội dung nằm ngang
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#f9f9f9", // Màu nền trắng nhạt
    borderWidth: 1,
    borderColor: "#ccc", // Viền nhạt
    marginVertical: 10, // Khoảng cách bên trên và dưới
  }}
   onPress={() => navigation.navigate("Sold", { userId: user.id })} // Nút này có thể điều hướng sang màn hình khác
>
  {/* Biểu tượng bên trái */}
  <View
    style={{
      marginRight: 10, // Khoảng cách giữa biểu tượng và chữ
      backgroundColor: "#e6e6e6", // Màu nền xám nhạt cho biểu tượng
      padding: 5,
      borderRadius: 50, // Làm tròn biểu tượng
    }}
  >
    <Image
      source={{ uri: "https://img.icons8.com/?size=100&id=24717&format=png" }} // URL hoặc thay bằng biểu tượng local
      style={{
        width: 20,
        height: 20,
        tintColor: "#007BFF", // Màu của biểu tượng
      }}
    />
  </View>

  {/* Chữ bên phải */}
  <Text style={{ fontSize: 16, color: "#333" }}>Đăng sản phẩm bán</Text>
</TouchableOpacity>

<TouchableOpacity
  style={{
    flexDirection: "row", // Hiển thị nội dung nằm ngang
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#f9f9f9", // Màu nền trắng nhạt
    borderWidth: 1,
    borderColor: "#ccc", // Viền nhạt
    marginVertical: 10, // Khoảng cách bên trên và dưới
  }}
   onPress={() => navigation.navigate("List", { userId: user.id })} // Nút này có thể điều hướng sang màn hình khác
>
  {/* Biểu tượng bên trái */}
  <View
    style={{
      marginRight: 10, // Khoảng cách giữa biểu tượng và chữ
      backgroundColor: "#e6e6e6", // Màu nền xám nhạt cho biểu tượng
      padding: 5,
      borderRadius: 50, // Làm tròn biểu tượng
    }}
  >
    <Image
      source={{ uri: "https://img.icons8.com/?size=64&id=LlotdPGo8weI&format=png" }} // URL hoặc thay bằng biểu tượng local
      style={{
        width: 20,
        height: 20,
        tintColor: "#007BFF", // Màu của biểu tượng
      }}
    />
  </View>

  {/* Chữ bên phải */}
  <Text style={{ fontSize: 16, color: "#333" }}>Sản phẩm đã đăng</Text>
</TouchableOpacity>


    </View>
     )}
    {/* Nhập URI mới */}
    {isEditing && (
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 16, color: "#555", marginBottom: 5 }}>
          Enter new Avatar URI
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            fontSize: 14,
          }}
          value={newAvatarUri}
          onChangeText={setNewAvatarUri}
        />
        <TouchableOpacity
          onPress={updateAvatarUri}
          style={{
            backgroundColor: "#007BFF",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Update Avatar</Text>
        </TouchableOpacity>
      </View>
    )}
    <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#333",
          marginBottom: 10,
          left:30
        }}
      >
        INFORMATION
      </Text>

    {/* Thông tin chỉnh sửa trong ScrollView */}
    <ScrollView
      style={{
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginHorizontal: 10,
        elevation: 3,
        marginBottom: 20, // Thêm khoảng cách để nút Save không bị che khuất
      }}
      contentContainerStyle={{ paddingVertical: 10 }}
    >
      
      {[
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "phoneNumber", label: "Phone Number" },
        { key: "email", label: "Email" },
        { key: "address", label: "Address" },
        { key: "dob", label: "Date of Birth" },
      ].map(({ key, label }) => (
        <View
          key={key}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "#555", marginRight: 10, width: 120 }}>
            {label}
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              flex: 1,
              fontSize: 14,
              paddingVertical: 5,
            }}
            
            value={user[key]}
            onChangeText={(text) => setUser({ ...user, [key]: text })}
          />
        </View>
      ))}
    </ScrollView>

    {/* Nút Save */}
    {isEditing && (
      <TouchableOpacity
        style={{
          backgroundColor: "#28a745",
          padding: 10,
          borderRadius: 5,
          marginHorizontal: 20,
          alignItems: "center",
        }}
        onPress={saveProfile}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Save</Text>
      </TouchableOpacity>
    )}

    {/* Nút Edit */}
    {!isEditing && (
      <TouchableOpacity
        style={{
          backgroundColor: "#00BFFF",
          padding: 10,
          borderRadius: 5,
          margin: 20,
          alignItems: "center",
        }}
        onPress={() => setIsEditing(true)}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Edit Profile</Text>
      </TouchableOpacity>
    )}
  </View>
);

};

export default ProfileScreen;
