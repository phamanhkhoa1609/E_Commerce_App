import React from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';

// ReviewItem Component
const ReviewItem = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          <Text style={{ color: 'gray' }}>{item.date}</Text>
          <Rating
            type="star"
            ratingCount={5}
            startingValue={item.rating}
            imageSize={20}
            readonly
          />
        </View>
      </View>
      <Text style={{ marginTop: 5 }}>{item.review}</Text>
    </View>
  );
};

// ReviewsScreen Component
const ReviewsScreen = ({ route, navigation }) => {
  const { reviews } = route.params; // Get reviews data passed through navigation

  // Create a ratings summary object to count how many reviews for each star
  const ratingsSummary = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  return (
    <View style={{ width:'50vh', backgroundColor: '#fff', padding: 15 ,height:'100vh'}}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {/* Display total number of reviews */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
          {reviews.length} reviews
        </Text>

        {/* Ratings summary card */}
        <View
          style={{
            borderWidth: 1,
            backgroundColor: 'transparent',
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            elevation: 2,
          }}
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <View
              key={star}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <Rating
                type="star"
                ratingCount={5}
                startingValue={star}
                imageSize={20}
                readonly
              />
              <Text style={{ marginLeft: 10, fontSize: 16 }}>
                {ratingsSummary[star] || 0} review
                {(ratingsSummary[star] || 0) !== 1 && 's'}
              </Text>
            </View>
          ))}
        </View>

        {/* List of reviews */}
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>
    </View>
  );
};

export default ReviewsScreen;
