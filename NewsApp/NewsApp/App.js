import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {

  const [news, setNews] = useState([]);

  const getNews = async () => {
    try {

      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=bcb434d7db6b4f10b82f5ad98ddd9b10"
      );

      setNews(response.data.articles);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>

        <Image
          source={{ uri: item.urlToImage }}
          style={styles.image}
        />

        <Text style={styles.title}>
          {item.title}
        </Text>

      </View>
    );
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 40,
    padding: 10
  },

  card: {
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 10
  },

  image: {
    width: "100%",
    height: 200
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10
  }

});