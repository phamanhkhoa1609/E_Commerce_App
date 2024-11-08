import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setaddress] = useState("");
  const [dob, setDob] = useState(""); // Date of birth
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // State để lưu lỗi
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSignUp = async () => {
    let tempErrors = {};
    if (!firstName) tempErrors.firstName = "First name is required.";
    if (!lastName) tempErrors.lastName = "Last name is required.";
    if (!username) tempErrors.username = "Username is required.";
    if (!email) tempErrors.email = "Email is required.";
    if (!phoneNumber) tempErrors.phoneNumber = "Phone number is required.";
    if (!address) tempErrors.address = "address is required.";
    if (!dob) tempErrors.dob = "Date of birth is required.";
    if (!password) tempErrors.password = "Password is required.";
    if (!confirmPassword) tempErrors.confirmPassword = "Confirm password is required.";
    if (password !== confirmPassword) tempErrors.confirmPassword = "Passwords do not match.";

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) return;

    setLoading(true);

    try {
      const checkResponse = await fetch(
        "https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login"
      );
      const existingUsers = await checkResponse.json();
      const isUsernameTaken = existingUsers.some((user) => user.username === username);

      if (isUsernameTaken) {
        setLoading(false);
        setErrors((prev) => ({ ...prev, username: "Username is already taken." }));
        return;
      }

      const response = await fetch(
        "https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            dob,
          }),
        }
      );

      if (response.ok) {
        setLoading(false);
        navigation.navigate("Login");
      } else {
        setLoading(false);
        setErrors((prev) => ({ ...prev, general: "Failed to create account. Please try again." }));
      }
    } catch (error) {
      setLoading(false);
      setErrors((prev) => ({ ...prev, general: "Failed to connect to server." }));
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
        Create Your Account
      </Text>

      {/* First Name và Last Name */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1, margin: 5 }}>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: errors.firstName ? "red" : "#ccc",
              borderRadius: 8,
            }}
          />
          {errors.firstName && <Text style={{ color: "red", fontSize: 12 }}>{errors.firstName}</Text>}
        </View>
        <View style={{ flex: 1, margin: 5 }}>
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: errors.lastName ? "red" : "#ccc",
              borderRadius: 8,
            }}
          />
          {errors.lastName && <Text style={{ color: "red", fontSize: 12 }}>{errors.lastName}</Text>}
        </View>
      </View>


      {/* Email */}
      <TextInput
        placeholder="Email"
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

      {/* Phone Number */}
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{
          marginVertical: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: errors.phoneNumber ? "red" : "#ccc",
          borderRadius: 8,
        }}
      />
      {errors.phoneNumber && <Text style={{ color: "red", fontSize: 12 }}>{errors.phoneNumber}</Text>}

      {/* address */}
      <TextInput
        placeholder="address"
        value={address}
        onChangeText={setaddress}
        style={{
          marginVertical: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: errors.address ? "red" : "#ccc",
          borderRadius: 8,
        }}
      />
      {errors.address && <Text style={{ color: "red", fontSize: 12 }}>{errors.address}</Text>}

      {/* Date of Birth */}
      <TextInput
        placeholder="Date of Birth (dd/mm/yyyy)"
        value={dob}
        onChangeText={setDob}
        style={{
          marginVertical: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: errors.dob ? "red" : "#ccc",
          borderRadius: 8,
        }}
      />
      {errors.dob && <Text style={{ color: "red", fontSize: 12 }}>{errors.dob}</Text>}
      
       {/* Username */}
      <TextInput
        placeholder="Choose your username"
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

      {/* Password */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: errors.password ? "red" : "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <TextInput
          placeholder="Create a password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon name={showPassword ? "eye" : "eye-off"} size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={{ color: "red", fontSize: 12 }}>{errors.password}</Text>}

      {/* Confirm Password */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: errors.confirmPassword ? "red" : "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <TextInput
          placeholder="Confirm your password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
          <Icon name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && (
        <Text style={{ color: "red", fontSize: 12 }}>{errors.confirmPassword}</Text>
      )}

      {/* Đăng ký */}
      {loading ? (
        <ActivityIndicator size="large" color="#00c4ff" />
      ) : (
        <TouchableOpacity
          onPress={handleSignUp}
          style={{
            backgroundColor: "#00c4ff",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Sign Up</Text>
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

export default SignUpScreen;
