import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ForgotPasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handlePasswordReset = async () => {
    let tempErrors = {};

    if (!username) tempErrors.username = "Username is required.";
    if (!email) tempErrors.email = "Email is required.";
    if (!newPassword) tempErrors.newPassword = "New password is required.";
    if (!confirmNewPassword) tempErrors.confirmNewPassword = "Confirm new password is required.";
    if (newPassword !== confirmNewPassword) tempErrors.confirmNewPassword = "Passwords do not match.";

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) return;

    setLoading(true);

    try {
      // Giả sử bạn lấy dữ liệu từ API hoặc một nơi lưu trữ người dùng
      const response = await fetch("https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login");
      const users = await response.json();

      const user = users.find((user) => user.username === username && user.email === email);

      if (!user) {
        setLoading(false);
        setErrors((prev) => ({ ...prev, general: "UserName hoặc Email sai ." }));
        return;
      }

      // Giả sử gửi yêu cầu thay đổi mật khẩu thành công
      const resetResponse = await fetch("https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/" + user.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, password: newPassword }),
      });

      if (resetResponse.ok) {
        setLoading(false);
        Alert.alert("Success", "Password reset successfully!");
        navigation.navigate("Login"); // Điều hướng đến màn hình đăng nhập sau khi đổi mật khẩu
      } else {
        setLoading(false);
        setErrors((prev) => ({ ...prev, general: "Failed to reset password. Please try again." }));
      }
    } catch (error) {
      setLoading(false);
      setErrors((prev) => ({ ...prev, general: "Failed to connect to server. Please try again." }));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
        Reset Your Password
      </Text>

      {/* Username */}
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        style={{
          marginVertical: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: errors.username ? "red" : "#ccc",
          borderRadius: 8,
        }}
      />
      {errors.username && <Text style={{ color: "red", fontSize: 12 }}>{errors.username}</Text>}

      {/* Email */}
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={{
          marginVertical: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: errors.email ? "red" : "#ccc",
          borderRadius: 8,
        }}
      />
      {errors.email && <Text style={{ color: "red", fontSize: 12 }}>{errors.email}</Text>}

      {/* New Password */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: errors.newPassword ? "red" : "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <TextInput
          placeholder="Enter new password"
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={setNewPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon name={showPassword ? "eye" : "eye-off"} size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
      {errors.newPassword && <Text style={{ color: "red", fontSize: 12 }}>{errors.newPassword}</Text>}

      {/* Confirm New Password */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: errors.confirmNewPassword ? "red" : "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <TextInput
          placeholder="Confirm new password"
          secureTextEntry={!showConfirmPassword}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
          <Icon name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
      {errors.confirmNewPassword && (
        <Text style={{ color: "red", fontSize: 12 }}>{errors.confirmNewPassword}</Text>
      )}

      {/* Submit Button */}
      {loading ? (
        <ActivityIndicator size="large" color="#00c4ff" />
      ) : (
        <TouchableOpacity
          onPress={handlePasswordReset}
          style={{
            backgroundColor: "#00c4ff",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Reset Password</Text>
        </TouchableOpacity>
      )}

      {errors.general && <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>{errors.general}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ textAlign: "center", marginTop: 20, color: "#00aaff", fontSize: 16 }}>
          Already have an account? Log In
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
